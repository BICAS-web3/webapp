import { FC } from "react"

import { Container } from '../../shared/ui/container/Container'
import styles from './games.module.scss';

export const Games: FC = () => {
    return(
      <div className={styles.wrapper}>
        <button className={styles.show}>
          <button className={styles.show__text}>Show more</button>
          <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5.75C0.585786 5.75 0.25 6.08579 0.25 6.5C0.25 6.91421 0.585786 7.25 1 7.25V5.75ZM21.5303 7.03033C21.8232 6.73744 21.8232 6.26256 21.5303 5.96967L16.7574 1.1967C16.4645 0.903806 15.9896 0.903806 15.6967 1.1967C15.4038 1.48959 15.4038 1.96447 15.6967 2.25736L19.9393 6.5L15.6967 10.7426C15.4038 11.0355 15.4038 11.5104 15.6967 11.8033C15.9896 12.0962 16.4645 12.0962 16.7574 11.8033L21.5303 7.03033ZM1 7.25H21V5.75H1V7.25Z" fill="#666666"/>
          </svg>
        </button>
        <span className={styles.text}>Mini-Games</span>
        <div className={styles.group}>
          <div className={styles.group__img1}></div>
          <div className={styles.group__img2}></div>
        </div>
        <div className={styles.market}>
        <button className={styles.show}>
          <button className={styles.show__text}>Show more</button>
          <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5.75C0.585786 5.75 0.25 6.08579 0.25 6.5C0.25 6.91421 0.585786 7.25 1 7.25V5.75ZM21.5303 7.03033C21.8232 6.73744 21.8232 6.26256 21.5303 5.96967L16.7574 1.1967C16.4645 0.903806 15.9896 0.903806 15.6967 1.1967C15.4038 1.48959 15.4038 1.96447 15.6967 2.25736L19.9393 6.5L15.6967 10.7426C15.4038 11.0355 15.4038 11.5104 15.6967 11.8033C15.9896 12.0962 16.4645 12.0962 16.7574 11.8033L21.5303 7.03033ZM1 7.25H21V5.75H1V7.25Z" fill="#666666"/>
          </svg>
        </button>
        <span className={styles.text}>NFT Market</span>
        <div className={styles.nfts}>
          <button className={styles.nfts__nft1}></button>
          <button className={styles.nfts__nft2} ></button>
          <button className={styles.nfts__nft3}></button>
          <button className={styles.nfts__nft4}></button>
          <button className={styles.nfts__nft5}></button>
        </div>
        </div>
      </div>
    );

}