import api from "./api";

export const addReview = async (reviewData) => {

    const response = await api.post("/reviews", reviewData);

    return response.data;

};

export const getReviewsByHotel = async (hotelId) => {

    const response = await api.get(`/reviews/${hotelId}`);

    return response.data;

};

export const getAverageRating = async (hotelId) => {

    const response = await api.get(`/reviews/average/${hotelId}`);

    return response.data;

};