import { FC } from "react"
import {HandySvg} from 'handy-svg';

import styles from './signup.module.scss';

import metamaskIcon from '../../shared/media/Metamask.svg'

export const Signup: FC = () => {
  return(
    <div className={styles.wrapper}>
      <div className={styles.close}>
        <svg className={styles.icon} width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.62208 39.3858L21.0069 21.0011M21.0069 21.0011L39.3916 2.61629M21.0069 21.0011L2.62208 2.61629M21.0069 21.0011L39.3916 39.3858" stroke="#DBDBDB" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div className={styles.main}>
        <span className={styles.text}>Welcome to Bicas Ecosystem</span>
        <button className={styles.autorize}>
          <HandySvg
            src={metamaskIcon}
            className={styles.autorize__icon}
          />
          <button className={styles.autorize__text}>Connect Metamask Wallet</button>
        </button>
      </div>
    </div>

  );

}