import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap row">
        <div className="footer_monitorings">
          <div className="footer_monitorings__text">Партнёр сервисов:</div>
          <a
            target="_blank"
            className="footer__monitor_link footer__monitor_link_bestchange"
            href="https://www.bestchange.ru/sova-exchanger.html"
          >
            <img
              src="./img/bestchange.gif"
              title="Обмен QIWI, Bitcoin, Tether, AdvCash"
              alt="Мониторинг обменных пунктов BestChange"
              width="88"
              height="31"
              border="0"
            />
          </a>

          <a
            href="https://kurs.expert/ru/obmennik/sova-gg/feedbacks.html#reputation"
            target="_blank"
            className="footer__monitor_link"
            title="Обмен Биткоин, Киви, Яндекс, AdvCash"
          >
            <img src="./img/btn.cb.png" width="100" height="31" border="0" />
          </a>

          <a
            href="https://glazok.org/exchange/?details=929"
            target="_blank"
            className="footer__monitor_link"
            style={{ background: "#fff" }}
            title="Мониторинг обменных пунктов. Только лучшие курсы обмена!"
          >
            <img
              className="footer__monitor_link_glazok_img"
              src="./img/glazok_icon.png"
              height="21"
              border="0"
            />
          </a>

          <a
            target="_blank"
            href="https://www.okchanger.ru/exchangers/Sova"
            className="footer__monitor_link"
          >
            <img src="./img/90x32.png" />
          </a>

          <a
            href="https://amlbot.com/"
            className="footer__monitor_link"
            target="_blank"
          >
            <img src="./img/88.31.png" />
          </a>
        </div>

        <div className="copy">
          © 2021, Sova - это мультивалютный обменный сервис, где Вы можете
          безопасно и выгодно купить или продать нужную Вам валюту.
        </div>
        <div className="footer_links" style={{ display: "none" }}>
          <a
            href="https://exchangesumo.com/"
            target="_blank"
            title="Сервис поиска выгодного курса обмена"
          >
            <img src="./img/1.svg" width="88" height="31" border="0" />
          </a>
        </div>
      </div>
    </footer>
  );
}
