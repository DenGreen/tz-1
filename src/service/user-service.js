import axios from "axios";
import { geoPosition } from "../lib/findGeo";
import { identifyDevice } from "../lib/identifyDevice";
import moment from "moment";

export default class UserService {
  constructor() {
    this.bonusInfo = null;
  }

  static async gettingAccessToken() {
    try {
      const { latitude, longitude } = geoPosition;

      const response = await axios.post(
        `${process.env.REACT_APP_URL_AT}api/v3/clients/accesstoken`,
        {
          idClient: process.env.REACT_APP_CID,
          accessToken: process.env.REACT_APP_AK,
          paramName: identifyDevice,
          paramValue: process.env.REACT_APP_DID,
          latitude: latitude,
          longitude: longitude,
          sourceQuery: 0,
        },
        {
          headers: {
            AccessKey: process.env.REACT_APP_AK,
          },
        }
      );

      if (response.data.result.status > 0) {
        console.log("Ошибка при получении токена");
        return;
      }

      localStorage.setItem("AccessToken", response.data.accessToken);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  static async gettingBonus() {
    try {
      const token = localStorage.getItem("AccessToken");

      if (!token) {
        console.log("Токен не найден");
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_URL_BONUS}api/v3/ibonus/generalinfo/${token}`,
        {
          headers: {
            AccessKey: process.env.REACT_APP_AK,
            AccessToken: token,
          },
        }
      );

      this.bonusInfo = {
        ...response.data.data,
        dateBurning: moment(response.data.data.dateBurning).format("DD.MM"),
      };
      return;
    } catch (error) {
      console.log(error);
    }
  }
}
