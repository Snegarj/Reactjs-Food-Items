import React from 'react';
import './style.css';

import React, { useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  var [value, setValue] = useState([]);
  const [id, setId] = useState([]);
  const [isActiveMenu, setActiveMenu] = useState(true);
  const [isActiveOrder, setActiveOrder] = useState(false);
  var updatePrice;
  var total = 0;

  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Potato',
      img:
        'https://www.listchallenges.com/f/lists/3d06c742-15cc-49b2-8845-7ef42d0c9f97.jpg',
      price: 10,
      rate: 2.5,
      kg: 300,
      qty: 1
    },

    {
      id: 2,
      name: 'BLIZZARD',
      img: 'https://fastfood.theringer.com/img/items/7.jpg',
      price: 5.2,
      rate: 4.1,
      kg: 400,
      qty: 1
    },
    {
      id: 3,
      name: 'Sandwich',
      img: 'https://fastfood.theringer.com/img/items/12.jpg',
      price: 4,
      rate: 4,
      kg: 150,
      qty: 1
    },

    {
      id: 4,
      name: 'Deluxe ',
      img:
        'https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/33/1502918202-au-bon-pain-vegetarian-deluxe-salad.jpg?crop=0.698xw:0.998xh;0.188xw,0&resize=768:*',
      price: 10,
      rate: 2.5,
      kg: 300,
      qty: 1
    },
    {
      id: 5,
      name: ' Sandwich',
      img:
        'https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/34/1503418575-hardees-charbroiled-bbq-chicken.jpeg?crop=0.494xw:0.986xh;0.288xw,0.00345xh&resize=768:*',
      price: 22,
      rate: 2.5,
      kg: 500,
      qty: 1
    },

    {
      id: 6,
      name: 'pizza',
      img:
        'https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/34/1503427740-pizza-hut-veggie-lovers.jpeg?crop=0.413xw:0.972xh;0.226xw,0.0244xh&resize=768:*',
      price: 40,
      rate: 2.5,
      kg: 300,
      qty: 1
    },
    {
      id: 7,
      name: ' Salad',
      img:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/whataburger-apple-cranberry-salad-1560808043.jpg?crop=0.99812734082397xw:1xh;center,top&resize=768:*',
      price: 35,
      rate: 4.5,
      kg: 400,
      qty: 1
    },

    {
      id: 8,
      name: 'Soup',
      img:
        'http://cooktellsastory.com/wp-content/uploads/2021/05/A-bowl-of-miso-soup-with-chopsticks-on-a-table..png',
      price: 30,
      rate: 3.5,
      kg: 200,
      qty: 1
    }
  ]);
  //===============
  // TRUE======MENUOPEN ///////////BLANK
  //TRU=========ODEROPEN   ///////////BLACK
  const handleToggle = () => {
    setActiveMenu(!isActiveMenu);
    setActiveOrder(false)
  
  };

  const handleToggle1 = () => {
    setActiveOrder(!isActiveOrder);
    setActiveMenu(false)
  };

  function IncrementEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    var updateqty = object2.qty;
    // { }  =>    [  "1"  ," name",......]
    // id === id // 1 === 1
    // ... ,  item.qty
    if (keys1[0] !== keys2[0]) {
      return false;
    } else {
      updateqty = updateqty + 1;
      object2.qty = updateqty;
      setValue([...value, updateqty]);
    }
    return true;
  }
  //===========DecrementEqual
  function DecrementEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    var updateqty = object2.qty;

    // { }  =>    [  "1"  ," name",......] id === id // 1 === 1 ... ,  item.qty
    if (keys1[0] !== keys2[0]) {
      return false;
    } else {
      if (updateqty > 1) {
        updateqty = updateqty - 1;
        object2.qty = updateqty;
      }

      setValue([...value, updateqty]);
    }
    return true;
  }

  //===========RemoveDuplicateObjects
  var removeDuplicateObjects = () => {
    var uniqueArr = [];
    var objStrings = [];

    value.forEach(element => {
      if (typeof element === 'object' && element !== null) {
        var eleString = JSON.stringify(element);
        if (!objStrings.includes(eleString)) {
          uniqueArr.push(element);
          objStrings.push(eleString);
        }
      }
    });

    return uniqueArr;
  };
  //=============Selected ONclick
  const SelectedItem = item => {
    setValue([...value, item]);
    value = removeDuplicateObjects();
  };

  // value [ {},{} ,{ }]
  //================UpdateQuantity
  function UpdateQuantity(val) {
    value.map(function(element) {
      return IncrementEqual(element, val);
    });
  }

  //=============DecrementQty
  function DecrementQty(val) {
    return value.map(function(element) {
      return DecrementEqual(element, val);
    });
  }
  //==============PriceUpdate
  function PriceUpdate(val) {
    var curPrice = val.price;
    updatePrice = curPrice * val.qty;

    return updatePrice;
  }

  //===============DeleteItem

  function DeleteItem(val) {
    {
      const remove = value.findIndex(item => item.id === val.id);
      value.splice(remove, 1);
    }
    setValue([...value]);
  }
  //==============Total
  function Total() {
    //+update of the qty
    //update of the value
    value.map(function(item) {
      return (total = total + item.price * item.qty);
    });

    return total;
  }

  const ListItems = items.map(function(item) {
    return (
      <div
        className="card"
        key={item.id}
        onClick={e => {
          SelectedItem(item);
        }}
      >
        <div className="inline">
          <div className="text-left">
            <p className="inline"><i class="fa fa-star-o" style={{color:"red" , margin:"auto auto"}}></i>{item.rate}</p>
          </div>
          <div className="text-right">
            <p>&hearts;</p>
          </div>
        </div>
        <img src={item.img} />
        <div className="inline">
          <p className="name">{item.name}</p>
          <span>{item.kg}</span>
        </div>
        <h5 className="rs">${item.price}</h5>
      </div>
    );
  });

  function myorders() {
    value = removeDuplicateObjects();

    return (
      //value =[ {} ,{} , {}]

      value.map(function(val) {
        return (
          <div className="row" id="selected" key={val.id}>
            <div className="col-2">
              <img src={val.img} />
            </div>
            <div className="col-4">
              <h5 className="name">{val.name}</h5>
              <span className="kg">300g</span>
            </div>
            <span className="col-2" id="inlinecir">
              <span
                className="dec"
                onClick={e => {
                  DecrementQty(val);
                }}
              >
                -
              </span>
              <span className="num">{val.qty}</span>
              <span
                className="inc"
                onClick={e => {
                  UpdateQuantity(val);
                }}
              >
                +
              </span>
            </span>
            <div className="col-2" id="inline">
              <h5 id="rs">${PriceUpdate(val)}</h5>

            </div>
            
            <span  id ="x" className="col-1"
                onClick={e => {
                  DeleteItem(val);
                }}
              >
                X
              </span>
          </div>
        );
      })
    );
  }
  //starting menu open false
  // CLICK - MENUOPEN
  //CLICK -ORDEROPEN (TRUE) AND CLOSE MENU(FALSE)
//true ============MenuOPEN  && Order CLOSE
//MENU-Click ======  nothing happen
// ORDER-Click====== OrderOpen  //  OrderClose
  return (
    <>
      <div id="HomeRouter">
        <div className="inline">
          <p className="MENU" onClick={handleToggle} >Menu
          </p>

          <button className="MYORDERBTN"  onClick={handleToggle1}>MyOrders
          </button>
        </div>
<div className={isActiveMenu ? "MENUBLOCKACTIVE" : "MENUBLOCK" }>
        <div className="row"      >
          <div id="block" className="col-10">
            <div className="float-right">
              <div id="items">{ListItems}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div id="order" className={ isActiveOrder ?  ("col-12")    : ("ORDERFALSE")} >
            <div className="inline">
              <h5>My Order</h5>
              <span>Edit</span>
            </div>
            <p> 14.30 AM</p>

            {value.length ? (
              <>
                {myorders()}
                <div className="inline">
                  <h5 className="total">Total </h5>
                  <h5 className="rs">$ {Total()} </h5>
                </div>{' '}
              </>
            ) : (
              ' '
            )}
          </div>
      </div>








      <div className="container">
        <div className="row">
          <div className="col-2 " id="col-3" id="Menu1">
            <div className="side-nav">
              <p> Menu</p>
            </div>
          </div>

          <div id="block" className="col-7">
            <div className="text-right">
              <div className="block">
                <p>Filter</p>

                <h5>
                  <span>Sorted by:</span> Recommended
                </h5>
              </div>
            </div>

            <div className="float-right">
              <div id="items">{ListItems}</div>
            </div>
          </div>

          <div id="order" className="col-3">
            <div className="inline">
              <h5>My Order</h5>
              <span>Edit</span>
            </div>
            <p> 14.30 AM</p>

            {value.length ? (
              <>
                {myorders()}
                <div className="inline">
                  <h5 className="total">Total </h5>
                  <h5 className="rs">$ {Total()} </h5>
                </div>{' '}
              </>
            ) : (
              ' '
            )}
          </div>
        </div>
      </div>
    </>
  );
}
