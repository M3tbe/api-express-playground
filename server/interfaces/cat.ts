export interface Cat {
	id: string;
	image: string;
	title: string;
	date: Date;
	rating: number;
	rating_count: number;
	rating_sum: number;
}

export interface RateCatPayload {
	rating: number;
}

export interface RateCatResponse {
	success: boolean;
	message?: string;
	cat?: Cat;
}

export interface ListCats {
	cats: Array<Cat>;
}
