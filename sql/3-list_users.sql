CREATE OR REPLACE FUNCTION test.list_users(
    pagination_limit INTEGER DEFAULT 50,
    pagination_offset INTEGER DEFAULT 0,
    sort_by VARCHAR DEFAULT 'id',
    sort_dir VARCHAR DEFAULT 'ASC',
    filter_id INTEGER DEFAULT NULL,
    filter_name VARCHAR DEFAULT NULL,
    filter_organization_id INTEGER DEFAULT NULL
)
RETURNS TABLE (
    id INTEGER,
    email VARCHAR,
    name VARCHAR,
    timezone_id SMALLINT,
    country_id SMALLINT,
    locale_id SMALLINT,
    organizations_count BIGINT,
    scenarios_count BIGINT,
    active_scenarios_count BIGINT,
    organizations_with_scenario INTEGER[]
)
AS $$
BEGIN
    RETURN QUERY
    WITH list_user AS (
        SELECT
            u.id,
            u.email,
            u.name,
            u.timezone_id,
            u.country_id,
            u.locale_id,
            COUNT(DISTINCT ou.organization_id) AS organizations_count,
            COUNT(DISTINCT s.id) AS scenarios_count,
            COUNT(DISTINCT (CASE WHEN s.active THEN s.id END)) AS active_scenarios_count,
            ARRAY_AGG(DISTINCT ou.organization_id) FILTER (WHERE s.id IS NOT NULL) AS organizations_with_scenario
        FROM test."user" u
        LEFT JOIN test.organization_user ou ON u.id = ou.user_id
        LEFT JOIN test.team_user tu ON u.id = tu.user_id
        LEFT JOIN test.team t ON tu.team_id = t.id
        LEFT JOIN test.scenario s ON t.id = s.team_id
        WHERE (filter_id IS NULL OR u.id = filter_id)
        AND (filter_name IS NULL OR u.name ~* filter_name)
        AND (filter_organization_id IS NULL OR ou.organization_id = filter_organization_id)
        GROUP BY u.id
    )
    SELECT * FROM list_user
    ORDER BY
        CASE 
            WHEN sort_by = 'id' AND sort_dir = 'ASC' THEN CAST(list_user.id AS TEXT)
            WHEN sort_by = 'name' AND sort_dir = 'ASC' THEN list_user.name
            WHEN sort_by = 'organizations_count' AND sort_dir = 'ASC' THEN CAST(list_user.organizations_count AS TEXT)
        END ASC,
        CASE 
            WHEN sort_by = 'id' AND sort_dir = 'DESC' THEN CAST(list_user.id AS TEXT)
            WHEN sort_by = 'name' AND sort_dir = 'DESC' THEN list_user.name
            WHEN sort_by = 'organizations_count' AND sort_dir = 'DESC' THEN CAST(list_user.organizations_count AS TEXT)
        END DESC
    LIMIT pagination_limit
    OFFSET pagination_offset;
END;
$$ LANGUAGE plpgsql;
