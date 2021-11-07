import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Faq(props) {
  return (
    <>
      <Header />
      <style>
        {`
      footer{
      background: transparent;
    }`}
      </style>
      <style>
        {`
        body {
        background-size: 100%;
      }`}
      </style>
      <section className="main_template_zagalovok">
        <div className="wrap row no-margin">
          <h1>Ответы на часто задаваемые вопросы</h1>
        </div>
      </section>
      <section className="main_template">
        <div className="wrap_main_tamplate ">
          <div className="main_tamplate_content">
            <div className="col-md-12 col-sm-12 col-12 no-padding">
              <div className="accordeon_questions">
                <ul className="accordeon_questions__ul">
                  <li className="accordeon_questions__li">
                    <h2 className="accordeon_questions__h2">
                      Для чего нужны подтверждения в системе bitcoin? <i></i>
                    </h2>
                    <div className="accordeon_questions__msg">
                      При получении bitcoin монет, получатель не может сразу ими
                      воспользоваться. Как перевод совершен – он отправляется в
                      сеть Bitcoin для исполнения и должен быть включен в блок,
                      чтобы стать подтверждённым. Процесс включения перевода в
                      состав найденного блока называется подтверждением
                      транзакции. Включение в 1 блок = 1 подтверждение, когда
                      таких подтверждений набирается 2 и выше перевод считается
                      подтвержденным, и операторы sova, в свою очередь,
                      обрабатывают заявку. Такой способ был введен для защиты от
                      повторного пользования одних и тех же bitcoin.
                    </div>
                  </li>

                  <li className="accordeon_questions__li">
                    <h2 className="accordeon_questions__h2">
                      Дополнительные комиссии банков и платёжных систем. <i></i>
                    </h2>
                    <div className="accordeon_questions__msg">
                      Payeer: Комиссия (0.95%) в системе Payeer взимается с
                      отправителя. Сбербанк Онлайн: Комиссия 1% в системе
                      Сбербанк Онлайн взимается с отправителя. VIsa/MC RUB:
                      Комиссия 1.95% (от 30 рублей) в системе VIsa/MC RUB
                      взимается с отправителя.
                    </div>
                  </li>

                  <li className="accordeon_questions__li">
                    <h2 className="accordeon_questions__h2">
                      Минимальная максимальная сумма обмена. <i></i>
                    </h2>
                    <div className="accordeon_questions__msg">
                      Минимальная сумма обмена RUB от 5000 рублей USD от 3
                      долларов Bitcoin от 0.0005 BTC Минимальная сумма отдачи
                      ETH от 0.01 XRP от 20 BTC от 0.004 LTC от 0.002
                      Максимальная сумма обмена RUB до 200000 рублей USD до 3000
                      долларов Bitcoin до 15 BTC
                    </div>
                  </li>

                  <li className="accordeon_questions__li">
                    <h2 className="accordeon_questions__h2">
                      Сколько времени обрабатывается заявка? <i></i>
                    </h2>
                    <div className="accordeon_questions__msg">
                      Мы стараемся обрабатывать Ваши заявки как можно быстрее,
                      время обработки в среднем занимает от 5-15 минут, при
                      условии если перевод совершается моментально. Бывают
                      случаи задержек в самих платёжных системах, к сожалению мы
                      не в силах повлиять на скорость таких транзакций.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
