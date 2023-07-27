import React, { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import style from "./style.module.css"
import UserService from "../service/user-service";
import BonusCard from "../components/BonusCard/BonusCard";

const Bonus = () => {
  const [bonusInfo, setBonusInfo] = useState(UserService.bonusInfo);

  useEffect(() => {
    (async () => {
      await UserService.gettingAccessToken();
      await UserService.gettingBonus();
      setBonusInfo(UserService.bonusInfo);
    })();
  }, []);

  return (
    <>
      <section className={style["bonus-box"]}>
        <div className={style["bonus"]}>
          {!bonusInfo && (
            <div className={style["loading"]}>
              <PulseLoader color="#D2333E" size={20} />
            </div>
          )}
          {bonusInfo && (
            <BonusCard bonusInfo={bonusInfo}/>
          )}
        </div>
      </section>
    </>
  );
};

export default Bonus;
