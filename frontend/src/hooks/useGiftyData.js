import axios from "axios";
import { useQuery } from "react-query";

export default function useGiftyData() {
    return useQuery('allGiftyData', () => axios.get('/wishlist').then(res => res.data)); 
}