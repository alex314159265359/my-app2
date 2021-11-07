import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export async function getStaticProps(context) {
  const res = await fetch(
    `https://api.blockchain.com/v3/exchange/tickers/BTC-USD`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      rates: {
        uah: data.last_trade_price * 28,
        rub: data.last_trade_price * 74,
      },
      num: (new Date() / 1000) % 1000000 | 0,
    },
  };
}

const BANKS = [
  ["Сбербанк", "sber.png", "rub"],
  ["Тинькофф", "tff.svg", "rub"],
  ["Райффайзенбанк", "raiffeisenbank.svg", "rub"],
  ["Авангард", "bank_avangard.svg", "rub"],
  ["Альфа банк", "alfa.svg", "rub"],
  ["МИР", "mir_logo.svg", "rub"],
  ["Visa/MC RUB", "visamc_kaPE1uZ.svg", "rub"],
  ["Открытие", "otkrytie_logo.png", "rub"],
  ["Газпромбанк", "gazprombank.svg", "rub"],
  ["ВТБ", "ВТБ-white.svg", "rub"],
  ["Почта банк", "pochta_bank_zJVN4Jr.png", "rub"],
  ["МТС банк", "mtsbank_7ksHout.png", "rub"],
  ["Совкомбанк", "sovkombank_2xAjFq0.png", "rub"],
  ["РосБанк", "rosbank_logo.png", "rub"],
  ["Privat24 UAH", "Privat24UAH.svg", "uah"],
  ["УкрСиббанк", "sib.svg", "uah"],
  ["Ощадбанк", "oshad.svg", "uah"],
  ["Монобанк", "mono.svg", "uah"],
  ["Visa/MC UAH", "visa_mc_mqmstpI.svg", "uah"],
];

export default function Home(props) {
  const [minConvertSum, setMinConvertSum] = useState(0.0005);
  const [bank, setBank] = useState(0);
  const [rate, setRate] = useState(props.rates[BANKS[bank][2]]);
  const [sum, setSum] = useState(minConvertSum);
  const [convertedSum, setConvertedSum] = useState(
    +(minConvertSum * rate).toFixed(2)
  );
  const [modal, setModal] = useState(0);
  const [startTime, setStartTime] = useState(new Date());
  const [cTime, setCTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState("20:00");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [card, setCard] = useState("");
  const [pay, setPay] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCTime(new Date());
      const timeLeft = ((+startTime - +cTime) / 1000) | 0;
      const m = ("0" + ((timeLeft / 60) | 0)).slice(-2);
      const s = ("0" + (timeLeft - m * 60)).slice(-2);
      setTimeLeft(`${m}:${s}`);
    }, 500);

    return () => clearInterval(id);
  }, [cTime]);

  function modalOn() {
    if (!validateEmail(email)) return alert("Введите правильный email!");
    if (fullName.length < 3) return alert("Введите правильное ФИО!");
    if (card.length < 16 || card.length > 18)
      return alert("Введите правильный номер карты!");
    console.log(email, fullName, card);

    window.scrollTo(0, 0);

    const newTime = new Date(+new Date() + +1000 * 60 * 30);
    setStartTime(newTime);
    setCTime(new Date());
    setTimeLeft(`30:00`);
    setModal(1);
  }

  function setBankId(id) {
    console.log(id);
    const newRate = props.rates[BANKS[id][2]];
    setCTime(325);
    setBank(id);
    setRate(newRate);
    setConvertedSum(+(sum * newRate).toFixed(2));
  }

  function onChangeSum(e) {
    const newSum = e.target.value;
    setSum(newSum);
    setConvertedSum((newSum * rate).toFixed(2));
  }

  function onChangeConvertedSum(e) {
    const newSum = e.target.value;
    setConvertedSum(newSum);
    setSum((newSum / rate).toFixed(2));
  }

  function onClickPay(e) {
    window.scrollTo(0, 0);

    setPay(1);
  }

  return (
    <>
      <div
        className={"modala wrapa wrap row no-margin" + (!modal ? " pl" : "")}
      >
        <div className="block block_sm">
          <div className="claim_form_num">Заявка: {props.num}</div>
          {!!!pay && (
            <div className="block__title block__title_small-mobile tac">
              Для завершения операции обмена совершите следующие действия
            </div>
          )}
          {!!pay && (
            <div className="block__title block__title_small-mobile tac">
              Заявка обрабатывается, ожидайте получение средств в течении 30
              мин.
            </div>
          )}
          {!!!pay && (
            <div className="block__wrap">
              <div className="block__timer timer claim-time">
                Оплатите заявку в течении{" "}
                <span
                  className="claim-time-tick"
                  style={{ display: "contents" }}
                >
                  {timeLeft} мин.
                </span>
              </div>

              <div className="block__steps steps">
                <div className="steps__step step">
                  <div className="step__head row i-mid">
                    <div className="step__count">1</div>
                    <div className="step__title">
                      Осуществить перевод по реквизитам
                    </div>
                  </div>
                  <div className="step__body">
                    <div className="pay">
                      <div className="pay__where row no-margin i-mid">
                        <div className="row" style={{ width: "100%" }}>
                          <div className="pay__input input input_gray input_h60 input_radius input_placeholder-none input_required input_filled">
                            <div className="input__wrap input__wrap_coins">
                              <div className="input__placeholder">
                                Кошелек:
                                bc1qtmefetg2jys8myp5txaq7qmhnpupycdutsvlzx
                              </div>
                              <input
                                className="input__area"
                                type="text"
                                name="wallet"
                                value="Кошелек: bc1qtmefetg2jys8myp5txaq7qmhnpupycdutsvlzx"
                                readOnly="readonly"
                              />
                            </div>
                          </div>
                          <div
                            className="pay__copy btn btn_blue btn_h60 btn_radius btn_hover-gradient btn_copy"
                            data-clipboard-text="bc1qtmefetg2jys8myp5txaq7qmhnpupycdutsvlzx"
                          >
                            <img src="/img/copy.svg" />
                          </div>

                          <div className="pay__svg_coin">
                            <p>QR-код (адрес криптовалюты):</p>
                            <img
                              src="/img/address.png"
                              alt="bc1qtmefetg2jys8myp5txaq7qmhnpupycdutsvlzx"
                            />
                          </div>

                          <div className="pay__timer timer claim-time">
                            Оплатите заявку в течении{" "}
                            <span
                              className="claim-time-tick"
                              style={{ display: "contents" }}
                            >
                              {timeLeft} мин.
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="pay__data row">
                        <div className="pay__data-item">
                          <div className="pay__data-text">
                            <div className="pay__data-title">Сумма:</div>
                            <div className="pay__data-desc">{sum} BTC</div>
                          </div>
                          <div
                            className="pay__data-btn btn btn_blue btn_h30 btn_hover-gradient btn_copy btn_copy-sm"
                            data-clipboard-text={minConvertSum}
                          >
                            <img src="/img/copy.svg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="steps__step step">
                  <div className="step__head row i-mid">
                    <div className="step__count">2</div>
                    <div className="step__title">
                      После оплаты нажмите кнопку “Я оплатил”
                    </div>
                  </div>
                  <div className="step__body">
                    <div className="step__btns row">
                      <input
                        type="hidden"
                        name="csrfmiddlewaretoken"
                        value="1G5DcmzdiZfI7SPK859TN2Sz4O7GS9GY8xxLIkZCyd1jvhqegMuhPahFyXWR71bQ"
                      />
                      <button
                        type="submit"
                        className="pay_form_btn step__btn"
                        onClick={onClickPay}
                      >
                        Я оплатил
                      </button>

                      <a className="step__btn pay_link_main" href="/">
                        Отмена
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Header />

      <style>
        {`
      footer{
      background: transparent;
    }`}
      </style>
      <div
        id="tech"
        style={{
          background: "#e9ebeee6",
          width: "100%",
          height: "100%",
          zIndex: 10,
          textAlign: "center",
          position: "fixed",
          display: "none",
        }}
      >
        <div
          style={{
            fontSize: "37px",
            fontWeight: 300,
            color: "black",
            margin: "14% 0 0 0",
          }}
        >
          Технический режим
        </div>
        <div
          style={{
            color: "#000000ad",
            margin: "13px 0 0 0",
            fontSize: "17px",
          }}
        >
          <span id="time-tick">-461 мин. -56 сек.</span> до окончания
        </div>
      </div>
      <section className="main_page">
        <div className="wrap row no-margin justify-content-space-betwen">
          <p className="time_mode">Сервис работает круглосуточно!</p>
          <div className="give_away_block_col no-padding">
            <div className="give_away_block_first otdaete_first_bl">
              <span className="num_give_away_block">1</span>
              <div>
                <form id="start_exchange" method="POST">
                  <div className="give_away_title_bl">
                    <h2 className="give_away_title_bl__h2">Отдаете</h2>
                    <div className="give_away_title_bl__min_max">
                      <span className="give_away_title_bl__min">
                        Мин:{" "}
                        <span className="give_away_title_bl__min_sum">
                          {minConvertSum}
                        </span>
                      </span>
                      <span className="give_away_title_bl__max">
                        Макс:{" "}
                        <span className="give_away_title_bl__max_sum">15</span>
                      </span>
                    </div>
                  </div>
                  <label className="calc_input_left">
                    <input
                      required=""
                      className="in-text"
                      type="number"
                      name="send-value"
                      step="any"
                      id="calc_input_left"
                      value={sum}
                      onChange={onChangeSum}
                    />
                    <img className="calc_input_left_logo" src="./img/btc.png" />
                  </label>
                  <div className="minmax_in_err"></div>
                </form>
              </div>

              <div
                id="notifications_in_block"
                className="poluchaete_first_bl_note note_bl"
              >
                <span className="close_icon"></span>
                <h3>Уведомление!</h3>
                <div id="notifications_in"></div>
              </div>
            </div>
            <div className="give_away_block_second">
              <div className="ps_froms">
                <h3>Валюта отдачи:</h3>
                <ul
                  id="section-send"
                  className="section-send select_change row money_select_in"
                >
                  <li
                    className="currency__item pay-select-li active"
                    data-input-desc="btc"
                    data-currency-type="c"
                    data-pay-type="1"
                    data-pay-id="5"
                    data-way="1"
                  >
                    <input
                      className="currency__input"
                      type="hidden"
                      name="currency"
                      value="alfabank"
                      minLength=""
                      maxLength=""
                    />
                    <span>
                      <img className="logo_icon" src="./img/btc.png" />
                      Bitcoin
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="give_away_block_col no-padding">
            <div className="give_away_block_first poluchaete_first_bl">
              <span className="num_give_away_block">2</span>
              <div>
                <h2>Получите</h2>
                <label className="calc_input_right">
                  <img
                    className="calc_input_right_logo"
                    src={"./img/" + BANKS[bank][1]}
                  />
                  <input
                    required=""
                    className="to-text"
                    type="number"
                    step="any"
                    name="get-value"
                    id="calc_input_right"
                    value={convertedSum}
                    onChange={onChangeConvertedSum}
                  />
                </label>
                <div className="minmax_out_err"></div>

                <div className="type_currency_out_desktop">
                  <h3>Валюта получения:</h3>
                  <div className="type_currency type_currency_out">
                    <div className="active" data-filter="all">
                      ВСЕ
                    </div>
                    <div data-filter="r">RUB</div>
                    <div data-filter="d">USD</div>
                    <div data-filter="u">UAH</div>
                    <div data-filter="e">EUR</div>
                    <div data-filter="c">COIN</div>
                  </div>
                </div>
              </div>

              <div
                id="notifications_out_block"
                className="poluchaete_first_bl_note note_bl"
              >
                <span className="close_icon"></span>
                <h3>Уведомление!</h3>
                <div id="notifications_out"></div>
              </div>
            </div>
            <div className="give_away_block_second away_reserve_bl">
              <h3 className="ps_to_h3_mobile">Валюта получения:</h3>

              <div className="ps_toss">
                <ul
                  id="section-get"
                  className="section-get select_change row money_select_out"
                >
                  <li
                    className="currency__item pay-select-li active"
                    data-input-desc="rub"
                    data-currency-type="r"
                    data-pay-type="1"
                    data-pay-id="2"
                    data-way="2"
                    style={{}}
                    onClick={() => setBankId(0)}
                  >
                    <span>
                      <input
                        className="currency__input"
                        type="hidden"
                        name="currency"
                        value="alfabank"
                        minLength=""
                        maxLength=""
                      />
                      <img className="logo_icon" src="./img/sber.png" />
                      <span className="name_cur">Сбербанк</span>
                    </span>
                  </li>

                  <li
                    className="currency__item pay-select-li"
                    data-input-desc="rub"
                    data-currency-type="r"
                    data-pay-type="1"
                    data-pay-id="18"
                    data-way="2"
                    style={{}}
                    onClick={() => setBankId(1)}
                  >
                    <span>
                      <input
                        className="currency__input"
                        type="hidden"
                        name="currency"
                        value="alfabank"
                        minLength=""
                        maxLength=""
                      />
                      <img className="logo_icon" src="./img/tff.svg" />
                      <span className="name_cur">Тинькофф</span>
                    </span>
                  </li>

                  <li
                    className="currency__item pay-select-li"
                    data-input-desc="rub"
                    data-currency-type="r"
                    data-pay-type="1"
                    data-pay-id="61"
                    data-way="2"
                    style={{}}
                    onClick={() => setBankId(2)}
                  >
                    <span>
                      <input
                        className="currency__input"
                        type="hidden"
                        name="currency"
                        value="alfabank"
                        minLength=""
                        maxLength=""
                      />
                      <img
                        className="logo_icon"
                        src="./img/raiffeisenbank.svg"
                      />
                      <span className="name_cur">Райффайзенбанк</span>
                    </span>
                  </li>

                  <li
                    className="currency__item pay-select-li"
                    data-input-desc="rub"
                    data-currency-type="r"
                    data-pay-type="1"
                    data-pay-id="56"
                    data-way="2"
                    style={{}}
                    onClick={() => setBankId(3)}
                  >
                    <span>
                      <input
                        className="currency__input"
                        type="hidden"
                        name="currency"
                        value="alfabank"
                        minLength=""
                        maxLength=""
                      />
                      <img
                        className="logo_icon"
                        src="./img/bank_avangard.svg"
                      />
                      <span className="name_cur">Авангард</span>
                    </span>
                  </li>

                  <li
                    className="currency__item pay-select-li"
                    data-input-desc="rub"
                    data-currency-type="r"
                    data-pay-type="1"
                    data-pay-id="15"
                    data-way="2"
                    style={{}}
                    onClick={() => setBankId(4)}
                  >
                    <span>
                      <input
                        className="currency__input"
                        type="hidden"
                        name="currency"
                        value="alfabank"
                        minLength=""
                        maxLength=""
                      />
                      <img className="logo_icon" src="./img/alfa.svg" />
                      <span className="name_cur">Альфа банк</span>
                    </span>
                  </li>

                  <li
                    className="currency__item pay-select-li"
                    data-input-desc="rub"
                    data-currency-type="r"
                    data-pay-type="1"
                    data-pay-id="16"
                    data-way="2"
                    style={{}}
                    onClick={() => setBankId(5)}
                  >
                    <span>
                      <input
                        className="currency__input"
                        type="hidden"
                        name="currency"
                        value="alfabank"
                        minLength=""
                        maxLength=""
                      />
                      <img className="logo_icon" src="./img/mir_logo.svg" />
                      <span className="name_cur">МИР</span>
                    </span>
                  </li>

                  <li
                    className="currency__item pay-select-li"
                    data-input-desc="rub"
                    data-currency-type="r"
                    data-pay-type="1"
                    data-pay-id="17"
                    data-way="2"
                    style={{}}
                    onClick={() => setBankId(6)}
                  >
                    <span>
                      <input
                        className="currency__input"
                        type="hidden"
                        name="currency"
                        value="alfabank"
                        minLength=""
                        maxLength=""
                      />
                      <img
                        className="logo_icon"
                        src="./img/visamc_kaPE1uZ.svg"
                      />
                      <span className="name_cur">Visa/MC RUB</span>
                    </span>
                  </li>

                  <li
                    className="currency__item pay-select-li"
                    data-input-desc="rub"
                    data-currency-type="r"
                    data-pay-type="1"
                    data-pay-id="37"
                    data-way="2"
                    style={{}}
                    onClick={() => setBankId(7)}
                  >
                    <span>
                      <input
                        className="currency__input"
                        type="hidden"
                        name="currency"
                        value="alfabank"
                        minLength=""
                        maxLength=""
                      />
                      <img
                        className="logo_icon"
                        src="./img/otkrytie_logo.png"
                      />
                      <span className="name_cur">Открытие</span>
                    </span>
                  </li>

                  <li
                    className="currency__item pay-select-li"
                    data-input-desc="rub"
                    data-currency-type="r"
                    data-pay-type="1"
                    data-pay-id="39"
                    data-way="2"
                    style={{}}
                    onClick={() => setBankId(8)}
                  >
                    <span>
                      <input
                        className="currency__input"
                        type="hidden"
                        name="currency"
                        value="alfabank"
                        minLength=""
                        maxLength=""
                      />
                      <img className="logo_icon" src="./img/gazprombank.svg" />
                      <span className="name_cur">Газпромбанк</span>
                    </span>
                  </li>

                  <li
                    className="currency__item pay-select-li"
                    data-input-desc="rub"
                    data-currency-type="r"
                    data-pay-type="1"
                    data-pay-id="46"
                    data-way="2"
                    style={{}}
                    onClick={() => setBankId(9)}
                  >
                    <span>
                      <input
                        className="currency__input"
                        type="hidden"
                        name="currency"
                        value="alfabank"
                        minLength=""
                        maxLength=""
                      />
                      <img className="logo_icon" src="./img/ВТБ-white.svg" />
                      <span className="name_cur">ВТБ</span>
                    </span>
                  </li>

                  <li
                    className="currency__item pay-select-li"
                    data-input-desc="rub"
                    data-currency-type="r"
                    data-pay-type="1"
                    data-pay-id="54"
                    data-way="2"
                    style={{}}
                    onClick={() => setBankId(10)}
                  >
                    <span>
                      <input
                        className="currency__input"
                        type="hidden"
                        name="currency"
                        value="alfabank"
                        minLength=""
                        maxLength=""
                      />
                      <img
                        className="logo_icon"
                        src="./img/pochta_bank_zJVN4Jr.png"
                      />
                      <span className="name_cur">Почта банк</span>
                    </span>
                  </li>

                  <li
                    className="currency__item pay-select-li"
                    data-input-desc="rub"
                    data-currency-type="r"
                    data-pay-type="1"
                    data-pay-id="55"
                    data-way="2"
                    style={{}}
                    onClick={() => setBankId(11)}
                  >
                    <span>
                      <input
                        className="currency__input"
                        type="hidden"
                        name="currency"
                        value="alfabank"
                        minLength=""
                        maxLength=""
                      />
                      <img
                        className="logo_icon"
                        src="./img/mtsbank_7ksHout.png"
                      />
                      <span className="name_cur">МТС банк</span>
                    </span>
                  </li>

                  <li
                    className="currency__item pay-select-li"
                    data-input-desc="rub"
                    data-currency-type="r"
                    data-pay-type="1"
                    data-pay-id="60"
                    data-way="2"
                    style={{}}
                    onClick={() => setBankId(12)}
                  >
                    <span>
                      <input
                        className="currency__input"
                        type="hidden"
                        name="currency"
                        value="alfabank"
                        minLength=""
                        maxLength=""
                      />
                      <img
                        className="logo_icon"
                        src="./img/sovkombank_2xAjFq0.png"
                      />
                      <span className="name_cur">Совкомбанк</span>
                    </span>
                  </li>

                  <li
                    className="currency__item pay-select-li"
                    data-input-desc="rub"
                    data-currency-type="r"
                    data-pay-type="1"
                    data-pay-id="62"
                    data-way="2"
                    style={{}}
                    onClick={() => setBankId(13)}
                  >
                    <span>
                      <input
                        className="currency__input"
                        type="hidden"
                        name="currency"
                        value="alfabank"
                        minLength=""
                        maxLength=""
                      />
                      <img className="logo_icon" src="./img/rosbank_logo.png" />
                      <span className="name_cur">РосБанк</span>
                    </span>
                  </li>

                  <li
                    className="currency__item pay-select-li"
                    data-input-desc="uah"
                    data-currency-type="u"
                    data-pay-type="1"
                    data-pay-id="40"
                    data-way="2"
                    style={{}}
                    onClick={() => setBankId(14)}
                  >
                    <span>
                      <input
                        className="currency__input"
                        type="hidden"
                        name="currency"
                        value="alfabank"
                        minLength=""
                        maxLength=""
                      />
                      <img className="logo_icon" src="./img/Privat24UAH.svg" />
                      <span className="name_cur">Privat24 UAH</span>
                    </span>
                  </li>

                  <li
                    className="currency__item pay-select-li"
                    data-input-desc="uah"
                    data-currency-type="u"
                    data-pay-type="1"
                    data-pay-id="41"
                    data-way="2"
                    style={{}}
                    onClick={() => setBankId(15)}
                  >
                    <span>
                      <input
                        className="currency__input"
                        type="hidden"
                        name="currency"
                        value="alfabank"
                        minLength=""
                        maxLength=""
                      />
                      <img className="logo_icon" src="./img/sib.svg" />
                      <span className="name_cur">УкрСиббанк</span>
                    </span>
                  </li>

                  <li
                    className="currency__item pay-select-li"
                    data-input-desc="uah"
                    data-currency-type="u"
                    data-pay-type="1"
                    data-pay-id="42"
                    data-way="2"
                    style={{}}
                    onClick={() => setBankId(16)}
                  >
                    <span>
                      <input
                        className="currency__input"
                        type="hidden"
                        name="currency"
                        value="alfabank"
                        minLength=""
                        maxLength=""
                      />
                      <img className="logo_icon" src="./img/oshad.svg" />
                      <span className="name_cur">Ощадбанк</span>
                    </span>
                  </li>

                  <li
                    className="currency__item pay-select-li"
                    data-input-desc="uah"
                    data-currency-type="u"
                    data-pay-type="1"
                    data-pay-id="43"
                    data-way="2"
                    style={{}}
                    onClick={() => setBankId(17)}
                  >
                    <span>
                      <input
                        className="currency__input"
                        type="hidden"
                        name="currency"
                        value="alfabank"
                        minLength=""
                        maxLength=""
                      />
                      <img className="logo_icon" src="./img/mono.svg" />
                      <span className="name_cur">Монобанк</span>
                    </span>
                  </li>

                  <li
                    className="currency__item pay-select-li"
                    data-input-desc="uah"
                    data-currency-type="u"
                    data-pay-type="1"
                    data-pay-id="44"
                    data-way="2"
                    style={{}}
                    onClick={() => setBankId(18)}
                  >
                    <span>
                      <input
                        className="currency__input"
                        type="hidden"
                        name="currency"
                        value="alfabank"
                        minLength=""
                        maxLength=""
                      />
                      <img
                        className="logo_icon"
                        src="./img/visa_mc_mqmstpI.svg"
                      />
                      <span className="name_cur">Visa/MC UAH</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="enter_data_block_col">
            <span className="num_give_away_block">3</span>

            <div>
              <h2>Ввод данных</h2>

              <div className="vvod_dannyx_1">
                <div className="kurs_obmena__bl">
                  <div className="kurs_obmena">
                    <div className="kurs_obmena__kurs_text_spinner">
                      <div className="obm_kurs_txt">Обмен по курсу:</div>
                      <span id="give_away_cur_val">1</span>{" "}
                      <span className="green_color">
                        {" "}
                        <span id="give_away_cur">btc</span> ={" "}
                        <span id="receive_cur_val">{rate | 0}</span>{" "}
                        <span id="receive_cur">{BANKS[bank][2]}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="otdaete_poluch">
                  <span className="change_cur_arr"></span>

                  <div className="otdaete">
                    <span className="otdaete_logo_inputs">
                      <img id="otdaete_logo_input" src="./img/btc.png" />
                    </span>
                    <span className="otdaete_give_away_cur_name">Bitcoin</span>

                    <span className="right_bl">
                      <span className="otdaete_give_away_cur_val">{sum}</span>
                      <span className="otdaete_give_away_cur green_color">
                        btc
                      </span>
                    </span>
                  </div>
                  <div className="poluchaete">
                    <span className="poluchaete_logo_inputs">
                      <img
                        id="poluchaete_logo_input"
                        src={"./img/" + BANKS[bank][1]}
                      />
                    </span>
                    <span className="poluchaete_give_away_cur_name">
                      {BANKS[bank][0]}
                    </span>

                    <span className="right_bl">
                      <span className="poluchaete_give_away_cur_val">
                        {convertedSum}
                      </span>
                      <span className="poluchaete_give_away_cur green_color">
                        {BANKS[bank][2]}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="vvod_dannyx_2">
                <div className="danniye_obmena">
                  <h3>Введите данные для завершения обмена:</h3>

                  <div className="form-item">
                    <input
                      type="text"
                      id="pay-email"
                      required=""
                      className="form-input email_input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="pay-email" className="form-label">
                      Введите Ваш E-mail
                    </label>
                  </div>

                  <div className="inputs_field_data">
                    <div id="inputs_voucher_btns_in" data-input=""></div>

                    <div id="in-inputs" className="inputs_field_in"></div>

                    <div id="to-inputs" className="inputs_field_out">
                      <div className="form-item  to-inputs pay-input active-calc-inputs-to">
                        <input
                          type="text"
                          id="to_requis1"
                          className="form-input"
                          required=""
                          name="names"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                        <label htmlFor="to_requis1" className="form-label">
                          ФИО получателя
                        </label>
                        <img
                          className="input_img_logo"
                          src={"./img/" + BANKS[bank][1]}
                        />
                      </div>
                      <div className="form-item  to-inputs pay-input active-calc-inputs-to">
                        <input
                          type="number"
                          id="to_requis2"
                          className="form-input"
                          required=""
                          name="names"
                          value={card}
                          onChange={(e) => setCard(e.target.value)}
                        />
                        <label htmlFor="to_requis2" className="form-label">
                          Карта {BANKS[bank][0]}, от 16 до 18 цифр
                        </label>
                        <img
                          className="input_img_logo"
                          src={"./img/" + BANKS[bank][1]}
                        />
                      </div>
                    </div>

                    <input
                      type="hidden"
                      name="csrfmiddlewaretoken"
                      value="MOVdAhWoZdp8ol47D3ERhzUBrsW3yCazTFnl6fmNfrbJMKFBLKZfjHjHVBLeNuFr"
                    />
                    <a
                      id="start_exchange_btn"
                      onClick={() => modalOn()}
                      className="claim_btn"
                    >
                      Обменять сейчас
                    </a>
                  </div>
                </div>
              </div>

              <div className="clearfix"></div>
              <div className="meditation_bl">
                <img src="./img/meditation.png" />
                <span>Сделано с душой</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews_main_page">
        <div className="wrap row no-margin">
          <div className="reviews_main_page__bl">
            <h2 className="reviews_main_page__title">Отзывы наших клиентов</h2>
            <div className="reviews_main_page__items">
              <div className="reviews_main_page__item">
                <div className="reviews_main_page__body">
                  <h3 className="reviews_main_page__name">
                    <svg className="icon icon-chat icon-chat-review">
                      <use xlinkHref="#icon-chat"></use>
                    </svg>
                    Александр
                  </h3>
                  <div className="reviews_main_page__text">
                    Очень хороший обменник, радует отзывчивый и помогающий
                    коллектив, который решает трудности и конечно же быстрота
                    работы!!!!
                  </div>
                </div>
                <div className="reviews_main_page__time_monitoring_name">
                  <div className="reviews_main_page__time">11.10.2021</div>
                  <div className="reviews_main_page__monitoring_name">
                    Bestchange
                  </div>
                </div>
              </div>

              <div className="reviews_main_page__item">
                <div className="reviews_main_page__body">
                  <h3 className="reviews_main_page__name">
                    <svg className="icon icon-chat icon-chat-review">
                      <use xlinkHref="#icon-chat"></use>
                    </svg>
                    Алина
                  </h3>
                  <div className="reviews_main_page__text">
                    Заявку обработали быстро, исправили мой косяк с реквизитами
                    в считанные секунды, спасибо операторам за оперативность.
                    Сервис работает отлично)
                  </div>
                </div>
                <div className="reviews_main_page__time_monitoring_name">
                  <div className="reviews_main_page__time">11.10.2021</div>
                  <div className="reviews_main_page__monitoring_name">
                    Bestchange
                  </div>
                </div>
              </div>

              <div className="reviews_main_page__item">
                <div className="reviews_main_page__body">
                  <h3 className="reviews_main_page__name">
                    <svg className="icon icon-chat icon-chat-review">
                      <use xlinkHref="#icon-chat"></use>
                    </svg>
                    Александра
                  </h3>
                  <div className="reviews_main_page__text">
                    Сегодня решили поменять обмен другого направления, как
                    "пробный" вариант- все прошло успешно! Пополнение торгового
                    счета бтк прошло в считанные минуты! Хочу отметить, что
                    верификацию карты вообще не пришлось ждать. Что нас очень
                    приятно удивило! Спасибо вам и вашей команде! Очень приятно
                    с вами работать!
                  </div>
                </div>
                <div className="reviews_main_page__time_monitoring_name">
                  <div className="reviews_main_page__time">9.10.2021</div>
                  <div className="reviews_main_page__monitoring_name">
                    Bestchange
                  </div>
                </div>
              </div>

              <div className="reviews_main_page__item">
                <div className="reviews_main_page__body">
                  <h3 className="reviews_main_page__name">
                    <svg className="icon icon-chat icon-chat-review">
                      <use xlinkHref="#icon-chat"></use>
                    </svg>
                    Larisa
                  </h3>
                  <div className="reviews_main_page__text">
                    Благодарю! Работает с небольшими суммами, за это огромный
                    плюс! Пользуюсь впервые, всё легко и просто. Супер!
                  </div>
                </div>
                <div className="reviews_main_page__time_monitoring_name">
                  <div className="reviews_main_page__time">7.10.2021</div>
                  <div className="reviews_main_page__monitoring_name">
                    Bestchange
                  </div>
                </div>
              </div>
            </div>

            <svg
              className="icon-pack"
              fill="none"
              style={{ display: "none" }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <symbol
                id="icon-chat"
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6.57143C18 3.01562 13.9721 0.142857 9 0.142857C4.0279 0.142857 0 3.02567 0 6.57143C0 8.61049 1.32589 10.4286 3.39509 11.6038C2.92299 13.2812 2.19978 13.8839 1.56696 14.5971C1.41629 14.7779 1.24554 14.9286 1.29576 15.1797C1.29576 15.1797 1.29576 15.1797 1.29576 15.1897C1.34598 15.4308 1.55692 15.5915 1.7779 15.5714C2.16964 15.5212 2.56138 15.4509 2.92299 15.3504C4.66071 14.9085 6.22768 14.0848 7.54353 12.9196C8.01563 12.9699 8.50781 13 9 13C13.9721 13 18 10.1272 18 6.57143Z"
                  fill="#00BF96"
                ></path>
              </symbol>
            </svg>
          </div>
        </div>
      </section>

      <section className="courses_main_page">
        <div className="wrap row no-margin">
          <div className="courses_main_page__bl">
            <div className="courses_main_page__courses" style={{ opacity: 1 }}>
              <div className="courses_main_page__item">
                <span className="courses_main_page__course_pair_val">
                  btc <b>62438</b> usd
                </span>
              </div>
              <div className="courses_main_page__item">
                <span className="courses_main_page__course_pair_val">
                  bch <b>596.4</b> usd
                </span>
              </div>
              <div className="courses_main_page__item">
                <span className="courses_main_page__course_pair_val">
                  eth <b>4526.01</b> usd
                </span>
              </div>
              <div className="courses_main_page__item">
                <span className="courses_main_page__course_pair_val">
                  ltc <b>200.1</b> usd
                </span>
              </div>
              <div className="courses_main_page__item">
                <span className="courses_main_page__course_pair_val">
                  zec <b>162.94</b> usd
                </span>
              </div>
              <div className="courses_main_page__item">
                <span className="courses_main_page__course_pair_val">
                  xrp <b>1.16</b> usd
                </span>
              </div>
              <div className="courses_main_page__item">
                <span className="courses_main_page__course_pair_val">
                  xlm <b>2.66313712</b> usd
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script>{`
      var api = {ways: [2, 18, 61, 56, 15, 16, 17, 37, 39, 46, 8, 54, 55, 60, 62, 4, 6, 7, 21, 3, 13, 14, 19, 20, 22, 40, 41, 42, 43, 44, 23, 47, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 38, 48, 50, 52, 53, 57, 58, 59]};
      var from_to = [5,2];
    `}</script>

      <Footer />

      <div className="ps_from_mobile">
        <div>
          <div
            className="ps_from_to_wr"
            style={{ maxWidth: "450px", margin: "0 auto" }}
          >
            <div className="type_currency_in_mobile">
              <div className="type_currency type_currency_in">
                <div className="active" data-filter="all">
                  ВСЕ
                </div>
                <div data-filter="r">RUB</div>
                <div data-filter="d">USD</div>
                <div data-filter="u">UAH</div>
                <div data-filter="e">EUR</div>
                <div data-filter="c">COIN</div>
              </div>
            </div>

            <h3>Валюта отдачи:</h3>
            <ul className="section-send select_change row money_select_in"></ul>
          </div>
        </div>
      </div>

      <div className="ps_to_mobile">
        <div className="away_reserve_bl">
          <div className="ps_from_to_wr">
            <div className="type_currency_to_mobile">
              <div className="type_currency type_currency_out">
                <div className="active" data-filter="all">
                  ВСЕ
                </div>
                <div data-filter="r">RUB</div>
                <div data-filter="d">USD</div>
                <div data-filter="u">UAH</div>
                <div data-filter="e">EUR</div>
                <div data-filter="c">COIN</div>
              </div>
            </div>
            <h3>Валюта получения:</h3>
            <ul className="section-get select_change row money_select_out">
              <li
                className="currency__item pay-select-li active"
                data-input-desc="rub"
                data-currency-type="r"
                data-pay-type="1"
                data-pay-id="2"
                data-way="2"
                style={{}}
                onClick={() => setBankId(0)}
              >
                <span>
                  <input
                    className="currency__input"
                    type="hidden"
                    name="currency"
                    value="alfabank"
                    minLength=""
                    maxLength=""
                  />
                  <img className="logo_icon" src="./img/sber.png" />
                  <span className="name_cur">Сбербанк</span>
                </span>
              </li>

              <li
                className="currency__item pay-select-li"
                data-input-desc="rub"
                data-currency-type="r"
                data-pay-type="1"
                data-pay-id="18"
                data-way="2"
                style={{}}
                onClick={() => setBankId(1)}
              >
                <span>
                  <input
                    className="currency__input"
                    type="hidden"
                    name="currency"
                    value="alfabank"
                    minLength=""
                    maxLength=""
                  />
                  <img className="logo_icon" src="./img/tff.svg" />
                  <span className="name_cur">Тинькофф</span>
                </span>
              </li>

              <li
                className="currency__item pay-select-li"
                data-input-desc="rub"
                data-currency-type="r"
                data-pay-type="1"
                data-pay-id="61"
                data-way="2"
                style={{}}
                onClick={() => setBankId(2)}
              >
                <span>
                  <input
                    className="currency__input"
                    type="hidden"
                    name="currency"
                    value="alfabank"
                    minLength=""
                    maxLength=""
                  />
                  <img className="logo_icon" src="./img/raiffeisenbank.svg" />
                  <span className="name_cur">Райффайзенбанк</span>
                </span>
              </li>

              <li
                className="currency__item pay-select-li"
                data-input-desc="rub"
                data-currency-type="r"
                data-pay-type="1"
                data-pay-id="56"
                data-way="2"
                style={{}}
                onClick={() => setBankId(3)}
              >
                <span>
                  <input
                    className="currency__input"
                    type="hidden"
                    name="currency"
                    value="alfabank"
                    minLength=""
                    maxLength=""
                  />
                  <img className="logo_icon" src="./img/bank_avangard.svg" />
                  <span className="name_cur">Авангард</span>
                </span>
              </li>

              <li
                className="currency__item pay-select-li"
                data-input-desc="rub"
                data-currency-type="r"
                data-pay-type="1"
                data-pay-id="15"
                data-way="2"
                style={{}}
                onClick={() => setBankId(4)}
              >
                <span>
                  <input
                    className="currency__input"
                    type="hidden"
                    name="currency"
                    value="alfabank"
                    minLength=""
                    maxLength=""
                  />
                  <img className="logo_icon" src="./img/alfa.svg" />
                  <span className="name_cur">Альфа банк</span>
                </span>
              </li>

              <li
                className="currency__item pay-select-li"
                data-input-desc="rub"
                data-currency-type="r"
                data-pay-type="1"
                data-pay-id="16"
                data-way="2"
                style={{}}
                onClick={() => setBankId(5)}
              >
                <span>
                  <input
                    className="currency__input"
                    type="hidden"
                    name="currency"
                    value="alfabank"
                    minLength=""
                    maxLength=""
                  />
                  <img className="logo_icon" src="./img/mir_logo.svg" />
                  <span className="name_cur">МИР</span>
                </span>
              </li>

              <li
                className="currency__item pay-select-li"
                data-input-desc="rub"
                data-currency-type="r"
                data-pay-type="1"
                data-pay-id="17"
                data-way="2"
                style={{}}
                onClick={() => setBankId(6)}
              >
                <span>
                  <input
                    className="currency__input"
                    type="hidden"
                    name="currency"
                    value="alfabank"
                    minLength=""
                    maxLength=""
                  />
                  <img className="logo_icon" src="./img/visamc_kaPE1uZ.svg" />
                  <span className="name_cur">Visa/MC RUB</span>
                </span>
              </li>

              <li
                className="currency__item pay-select-li"
                data-input-desc="rub"
                data-currency-type="r"
                data-pay-type="1"
                data-pay-id="37"
                data-way="2"
                style={{}}
                onClick={() => setBankId(7)}
              >
                <span>
                  <input
                    className="currency__input"
                    type="hidden"
                    name="currency"
                    value="alfabank"
                    minLength=""
                    maxLength=""
                  />
                  <img className="logo_icon" src="./img/otkrytie_logo.png" />
                  <span className="name_cur">Открытие</span>
                </span>
              </li>

              <li
                className="currency__item pay-select-li"
                data-input-desc="rub"
                data-currency-type="r"
                data-pay-type="1"
                data-pay-id="39"
                data-way="2"
                style={{}}
                onClick={() => setBankId(8)}
              >
                <span>
                  <input
                    className="currency__input"
                    type="hidden"
                    name="currency"
                    value="alfabank"
                    minLength=""
                    maxLength=""
                  />
                  <img className="logo_icon" src="./img/gazprombank.svg" />
                  <span className="name_cur">Газпромбанк</span>
                </span>
              </li>

              <li
                className="currency__item pay-select-li"
                data-input-desc="rub"
                data-currency-type="r"
                data-pay-type="1"
                data-pay-id="46"
                data-way="2"
                style={{}}
                onClick={() => setBankId(9)}
              >
                <span>
                  <input
                    className="currency__input"
                    type="hidden"
                    name="currency"
                    value="alfabank"
                    minLength=""
                    maxLength=""
                  />
                  <img className="logo_icon" src="./img/ВТБ-white.svg" />
                  <span className="name_cur">ВТБ</span>
                </span>
              </li>

              <li
                className="currency__item pay-select-li"
                data-input-desc="rub"
                data-currency-type="r"
                data-pay-type="1"
                data-pay-id="54"
                data-way="2"
                style={{}}
                onClick={() => setBankId(10)}
              >
                <span>
                  <input
                    className="currency__input"
                    type="hidden"
                    name="currency"
                    value="alfabank"
                    minLength=""
                    maxLength=""
                  />
                  <img
                    className="logo_icon"
                    src="./img/pochta_bank_zJVN4Jr.png"
                  />
                  <span className="name_cur">Почта банк</span>
                </span>
              </li>

              <li
                className="currency__item pay-select-li"
                data-input-desc="rub"
                data-currency-type="r"
                data-pay-type="1"
                data-pay-id="55"
                data-way="2"
                style={{}}
                onClick={() => setBankId(11)}
              >
                <span>
                  <input
                    className="currency__input"
                    type="hidden"
                    name="currency"
                    value="alfabank"
                    minLength=""
                    maxLength=""
                  />
                  <img className="logo_icon" src="./img/mtsbank_7ksHout.png" />
                  <span className="name_cur">МТС банк</span>
                </span>
              </li>

              <li
                className="currency__item pay-select-li"
                data-input-desc="rub"
                data-currency-type="r"
                data-pay-type="1"
                data-pay-id="60"
                data-way="2"
                style={{}}
                onClick={() => setBankId(12)}
              >
                <span>
                  <input
                    className="currency__input"
                    type="hidden"
                    name="currency"
                    value="alfabank"
                    minLength=""
                    maxLength=""
                  />
                  <img
                    className="logo_icon"
                    src="./img/sovkombank_2xAjFq0.png"
                  />
                  <span className="name_cur">Совкомбанк</span>
                </span>
              </li>

              <li
                className="currency__item pay-select-li"
                data-input-desc="rub"
                data-currency-type="r"
                data-pay-type="1"
                data-pay-id="62"
                data-way="2"
                style={{}}
                onClick={() => setBankId(13)}
              >
                <span>
                  <input
                    className="currency__input"
                    type="hidden"
                    name="currency"
                    value="alfabank"
                    minLength=""
                    maxLength=""
                  />
                  <img className="logo_icon" src="./img/rosbank_logo.png" />
                  <span className="name_cur">РосБанк</span>
                </span>
              </li>

              <li
                className="currency__item pay-select-li"
                data-input-desc="uah"
                data-currency-type="u"
                data-pay-type="1"
                data-pay-id="40"
                data-way="2"
                style={{}}
                onClick={() => setBankId(14)}
              >
                <span>
                  <input
                    className="currency__input"
                    type="hidden"
                    name="currency"
                    value="alfabank"
                    minLength=""
                    maxLength=""
                  />
                  <img className="logo_icon" src="./img/Privat24UAH.svg" />
                  <span className="name_cur">Privat24 UAH</span>
                </span>
              </li>

              <li
                className="currency__item pay-select-li"
                data-input-desc="uah"
                data-currency-type="u"
                data-pay-type="1"
                data-pay-id="41"
                data-way="2"
                style={{}}
                onClick={() => setBankId(15)}
              >
                <span>
                  <input
                    className="currency__input"
                    type="hidden"
                    name="currency"
                    value="alfabank"
                    minLength=""
                    maxLength=""
                  />
                  <img className="logo_icon" src="./img/sib.svg" />
                  <span className="name_cur">УкрСиббанк</span>
                </span>
              </li>

              <li
                className="currency__item pay-select-li"
                data-input-desc="uah"
                data-currency-type="u"
                data-pay-type="1"
                data-pay-id="42"
                data-way="2"
                style={{}}
                onClick={() => setBankId(16)}
              >
                <span>
                  <input
                    className="currency__input"
                    type="hidden"
                    name="currency"
                    value="alfabank"
                    minLength=""
                    maxLength=""
                  />
                  <img className="logo_icon" src="./img/oshad.svg" />
                  <span className="name_cur">Ощадбанк</span>
                </span>
              </li>

              <li
                className="currency__item pay-select-li"
                data-input-desc="uah"
                data-currency-type="u"
                data-pay-type="1"
                data-pay-id="43"
                data-way="2"
                style={{}}
                onClick={() => setBankId(17)}
              >
                <span>
                  <input
                    className="currency__input"
                    type="hidden"
                    name="currency"
                    value="alfabank"
                    minLength=""
                    maxLength=""
                  />
                  <img className="logo_icon" src="./img/mono.svg" />
                  <span className="name_cur">Монобанк</span>
                </span>
              </li>

              <li
                className="currency__item pay-select-li"
                data-input-desc="uah"
                data-currency-type="u"
                data-pay-type="1"
                data-pay-id="44"
                data-way="2"
                style={{}}
                onClick={() => setBankId(18)}
              >
                <span>
                  <input
                    className="currency__input"
                    type="hidden"
                    name="currency"
                    value="alfabank"
                    minLength=""
                    maxLength=""
                  />
                  <img className="logo_icon" src="./img/visa_mc_mqmstpI.svg" />
                  <span className="name_cur">Visa/MC UAH</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style>
        {`
      .snowfall-flakes{
      z-index: -1 !important;
    }`}
      </style>
    </>
  );
}
