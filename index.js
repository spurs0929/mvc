// 利用MVC實現加減乘除功能
(function(){
  
  function init(){
    model.init(); // 資料 + 資料監聽
    view.render(); // HTML模板 + 渲染函數模板
    controller.init(); // 事件處理函數定義與綁定
  }

  // Model
  var model = {
    // 資料初始值
    data: {
      a: 0,
      b: 0,
      s: '+',
      r: 0
    },

    init: function(){
      var _self = this;

      for(var k in _self.data){
        (function(k){
          Object.defineProperty(_self, k, {
            get: function(){
              return _self.data[k];
            },
            set: function(newValue){
              _self.data[k] = newValue;
              // 渲染函數
              view.render({ [k]: newValue });
            }
          })
        })(k);
      }
    }

  }

  // view
  var view = {
    el: '#app',
    template: `
      <p>
        <span class="cal-a">{{ a }}</span>
        <span class="cal-s">{{ s }}</span>
        <span class="cal-b">{{ b }}</span>
        <span>=</span>
        <span class="cal-r">{{ r }}</span>
      </p>
      <p>
        <input type="text" placeholder="Number a" class="cal-input a" />
        <input type="text" placeholder="Number b" class="cal-input b" />
      </p>
      <p>
        <button class="cal-btn">+</button>
        <button class="cal-btn">-</button>
        <button class="cal-btn">*</button>
        <button class="cal-btn">/</button>
      </p>
    `,
    render: function(mutedData){
      if(!mutedData){
        this.template = this.template.replace(/\{\{(.*?)\}\}/g, function(node, key){
          return model[key.trim()];
        });

        var container = document.createElement('div');
        container.innerHTML = this.template;
        document.querySelector(this.el).appendChild(container);
      }else{
        for(var k in mutedData){
          document.querySelector('.cal-' + k).textContent = mutedData[k];
        }
      }
    }
  }

  // 綁定事件處理函數
  var controller = {
    init: function(){
      var oCalInputs = document.querySelectorAll('.cal-input'),
          oCalBtns = document.querySelectorAll('.cal-btn'),
          btnItem,
          inputItem;

      for(var i = 0; i < oCalInputs.length; i++){
        inputItem = oCalInputs[i];

        inputItem.addEventListener('input', this.handleInput, false);
      }    

      for(var j = 0; j < oCalBtns.length; j++){
        btnItem = oCalBtns[j];

        btnItem.addEventListener('click', this.handleBtnClick, false);
      }
    },
    handleInput: function(e){
      var tar = e.target,
          value = Number(tar.value),
          filed = tar.className.split(' ')[1];

      model[filed] = value;

      // model.r = eval('model.a' + model.s + 'model.b');
      with(model){
        r = eval('a' + s + 'b');
      }

    },
    handleBtnClick: function(e){
      var type = e.target.textContent;

      console.log(type);

      model.s = type;

      with(model){
        r = eval('a' + s + 'b');
      }
    }
  }

  init();

})();