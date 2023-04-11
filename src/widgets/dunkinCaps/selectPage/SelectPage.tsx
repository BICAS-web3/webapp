import { FC } from "react"

import styles from './selectPage.module.scss';


export const SelectPage: FC = () => {
  return(
    <div className={styles.wrapper}>
      <div className={styles.select_nfts}></div>
      <div className={styles.content}>
        <div className={styles.text}>Select the NFT for the bid</div>
        <div className={styles.timer}>1:00</div>
      </div>
    </div>

  );

}