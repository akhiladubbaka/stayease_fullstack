import api from "./api";

export const getHotels = async (
search="",
city="",
rating="",
minPrice="",
maxPrice="",
sort="",
page=1,
limit=5
)=>{

let url =
`/hotels?search=${search}&city=${city}&rating=${rating}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&limit=${limit}`;

if (sort) {
    url += `&sort=${sort}`;
}

const response = await api.get(url);

return response.data;

};


export const getHotelById = async (id) => {

    const response = await api.get(`/hotels/${id}`);

    return response.data;

};

export const deleteHotel = async (id) => {

    const response = await api.delete(`/hotels/${id}`);

    return response.data;

};

export const updateHotel = async (id, hotelData) => {

    const response = await api.put(`/hotels/${id}`, hotelData);

    return response.data;

};

export const createHotel = async (hotel) => {

    const response = await api.post("/hotels", hotel);

    return response.data;

};