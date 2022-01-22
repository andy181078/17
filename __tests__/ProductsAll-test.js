"use strict"
import React from 'react';
import renderer from 'react-test-renderer';

import ProductsAll from "../components/ProductsAll"
                            //импортируем файл который будем тестировать


                  
let productsArr = [{
                    code: 1,
                    name: "Xiaomi Redmi 9C",
                    price: "1450",
                    url: "https://xistore.by/upload/resize/element/40056/082/8c4bed7595c8d031c1fa3140f267e255_482_482_50@x2.webp",
                    quant: 25
                },
                {
                    code: 2,
                    name: "Xiaomi Redmi 9T",
                    price: "1300",
                    url: "https://xistore.by/upload/resize/element/54071/35d/233362a5bb439d7f0563d6cdf494eb2a_482_482_50@x2.webp",
                    quant: 44
                },
                {
                    code: 3,
                    name: "Xiaomi Redmi Note 10S",
                    price: "1500",
                    url: "https://xistore.by/upload/resize/element/65048/aef/c525eee0d25db5d15c35bfadaabb8874_482_482_50@x2.webp",
                    quant: 10
                },
                {
                    code: 4,
                    name: "Xiaomi Redmi 9A",
                    price: "1550",
                    url: "https://xistore.by/upload/resize/element/25900/a59/1fa5c9ab7c694e4676d8fff64e7bcfc5_482_482_50@x2.webp",
                    quant: 10
                }
                
                
                ]

test("работа кнопки Add", ()=>{
                              // создаём тестовую версию компонента который будем тестировать
    const component = renderer.create(
        <ProductsAll  goods={productsArr}/> // с нужными данными для построения
    );

                            // 1. получаем снэпшот (HTML-снимок) компонента для сверки, чтобы вёрстка не испортилась
    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

                            // имитируем добавление нового клиента
    let newClient={code: 5, name: "vvv", price: "123", url: "Рkkk", quant: 400};
    component.getInstance().evAdd(newClient); //evAdd=(newRow)=> функция добавления 

                            //получаем снимок с новым клиентом
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
})

test("работа кнопки Delete", ()=>{
  // создаём тестовую версию компонента который будем тестировать
    const component = renderer.create(
    <ProductsAll  goods={productsArr}/> // с нужными данными для построения
    );

    // 1. получаем снэпшот (HTML-снимок) компонента для сверки, чтобы вёрстка не испортилась
    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    // имитируем удаление клиента
    component.getInstance().evDelete(2); //evDelete=(code)=> функция удаления 

    //получаем снимок с новым клиентом
    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
})



