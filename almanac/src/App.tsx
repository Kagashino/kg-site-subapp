import React from 'react';
import { init } from 'programmer-almanac-generator';
import { AlmanacResult } from 'programmer-almanac-generator/src/types';

function App() {
  const res: AlmanacResult = init(new Date());
  return (
    <>
      <h3>程序员老黄历</h3>
      <section className="almanac">
        <h2>{res.todayStr}</h2>
        <table cellSpacing={0}>
          <tbody>
          <tr className="fit">
            <td className="title"><h2>宜</h2></td>
            <td className="detail">
              {
                res.good.map((item) => (
                  <div key={item.name}>
                    <h3>{item.name}</h3>
                    <p>{item.good}</p>
                  </div>
                ))
              }
            </td>
          </tr>
          <tr className="unfit">
            <td className="title"><h2>忌</h2></td>
            <td className="detail">
              {
                res.bad.map((item, index) => (
                  <div key={index}>
                    <h3>{item.name}</h3>
                    <p>{item.bad}</p>
                  </div>
                ))
              }
            </td>
          </tr>
          </tbody>
        </table>
        <div className="other">
          <div>
            <h4>坐位朝向：</h4>
            <span>
                面向
                <span className="direction">{ res.direction }</span>写程序，BUG最少
              </span>
          </div>
          <div>
            <h4>今日宜饮：</h4>
            <span>{ res.drink.join('，') }</span>
          </div>
          <div>
            <h4>女神亲近指数：</h4>
            <span className="mekami">{ res.rate }</span>
          </div>
        </div>
        <footer>
          本老黄历保留了日期种子计算方法，可通过自定义配置，生成任意类型的老黄历
        </footer>
      </section>
    </>
  );
}

export default App;
