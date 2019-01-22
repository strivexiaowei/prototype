function Picker(e, opts) {
  let _this = $(e);
  let H = _this.parent().outerHeight();
  _this.parent().append(`<div class="wg-picker">
    <div class="wg-input-wrap">
      <input readonly class="wg-input" type="text"/>
      <div class="year-wrap">
        <ul class="year-list"></ul>
      </div>
    </div>
    <div class="wg-body">
      <div class="wg-nav">
        <span class="active">月报</span> <span>季度报</span>
      </div>
      <div class="wg-month-wrap clearfix show"></div>
      <div class="wg-quarter-wrap clearfix"></div>
      <div class="wg-footer-wrap">
        <div class="wg-footer">
          <div style="height: 22px; background-color: #fff;">
            <div class="tishi"></div>
          </div>
          <button class="reset" type="button">重置</button>
          <button class="confirm" type="botton">确定</button>
        </div>
      </div>
    </div>
  </div>
  <div class="mask"></div>
  `);
  _this.parent().find('.wg-picker').css({
    top: (H + 10) + 'px'
  })
  _this.parent().on('click', function (e) {
    $(this).find('.wg-picker').addClass('show');
    $(this).find('.mask').addClass('show');
    e.stopPropagation()
  })
  let yearRange = opts.yearRange ? opts.yearRange : [2000, 2018];
  let yearList = [];
  for (let i = yearRange[0]; i <= yearRange[1]; i++) {
    yearList.push(i);
  }
  let monthList = opts.monthList;
  let quarterList = opts.quarterList;
  let year = opts.year;
  _this.parent().find('.wg-input').val(year);
  for (let i = 0; i < yearList.length; i++) {
    _this.parent().find('.year-list').append(`<li data-year='${yearList[i]}'>${yearList[i]}</li>`)
  }
  for (let i = 0; i < monthList.length; i++) {
    _this.parent().find('.wg-month-wrap').append(
      `<span data-time='${ year*100 + (i + 1) }' class="wg-month-list">${
                monthList[i]
              }</span>`
    )
  }
  for (let i = 0; i < quarterList.length; i++) {
    _this.parent().find('.wg-quarter-wrap').append(
      `<span data-time='${ year*100 + (i + 1) }' class="wg-quarter-list">${
          quarterList[i]
              }</span>`
    )
  }
  getMonthPicker();
  _this.parent().find('.wg-nav span').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    let idx = $(this).index();
    if (idx === 0) {
      getMonthPicker();
    }
    if (idx === 1) {
      getQuarterPicker();
    }
  })

  function getMonthPicker() {
    let startTime = 0;
    let endTime = 0;
    let act = 0;
    let activeColor = function () {
      let active = _this.parent().find('.wg-month-list');
      for (let i = 0; i < active.length; i++) {
        let activeNum = active.eq(i).data("time");
        if (activeNum >= startTime && activeNum <= endTime) {
          active.eq(i).addClass("active");
        } else {
          active.eq(i).removeClass("active");
        }
      }
    }
    let startValue = function () {
      let start = startTime;
      let startYear = (start / 100).toFixed(0);
      let startMonth = start % 100;
      return startYear + '年' + startMonth + '月';
    }
    let endValue = function () {
      let end = endTime;
      let endYear = (end / 100).toFixed(0);
      let endMonth = end % 100;
      return endYear + '年' + endMonth + '月';
    }
    let confirm = function (e) {
      if (startTime === 0) {
        _this.val('');
      } else {
        _this.val(startValue() + '~' + endValue());
      }
      _this.parent().find('.wg-picker').removeClass('show');
      _this.parent().find('.mask').removeClass('show');
      e.stopPropagation();
    }
    let reset = function () {
      startTime = 0;
      endTime = 0;
      act = 0;
      _this.parent().find('.wg-input').val(opts.year);
      _this.parent().find('.tishi').removeClass('show');
      activeColor();
    }
    _this.parent().find('.tishi').removeClass('show');
    _this.parent().find('.wg-month-wrap').addClass('show').siblings().removeClass('show');
    let list = $('.wg-month-wrap').children();
    activeColor();
    _this.parent().find('.wg-month-wrap').on('click', '.wg-month-list', function () {
      let timeNum = $(this).data("time");
      let start = startTime;
      act++;
      if (act === 1) {
        startTime = timeNum;
        endTime = timeNum;
        _this.parent().find('.tishi').removeClass('show');
      }
      if (act === 2) {
        if (start <= timeNum) {
          endTime = timeNum;
        } else {
          endTime = start;
          startTime = timeNum;
        }
        _this.parent().find('.tishi').addClass('show').text(startValue() + '~' + endValue());
        act = 0;
      }
      activeColor();
    })
    _this.parent().find(".wg-input").on("click", function () {
      _this.parent().find(".year-wrap").addClass("show");
      let arr = _this.parent().find(".year-list").children();
      $(arr).on("click", function () {
        year = $(this).data("year");
        _this.parent().find(".wg-input").val(year);
        _this.parent().find(".year-wrap").removeClass("show");
        for (let i = 0; i < list.length; i++) {
          list.eq(i).data('time', year * 100 + (i + 1));
        }
        activeColor();
      });
    });
    _this.parent().find('.confirm').on('click', confirm);
    _this.parent().find('.mask').on('click', confirm);
    _this.parent().find('.reset').on('click', reset);
  }

  function getQuarterPicker() {
    let startTime = 0;
    let endTime = 0;
    let act = 0;
    let activeColor = function () {
      let active = _this.parent().find('.wg-quarter-list');
      for (let i = 0; i < active.length; i++) {
        let activeNum = active.eq(i).data("time");
        if (activeNum >= startTime && activeNum <= endTime) {
          active.eq(i).addClass("active");
        } else {
          active.eq(i).removeClass("active");
        }
      }
    }
    let startValue = function () {
      let start = startTime;
      let startYear = (start / 100).toFixed(0);
      let startMonth = start % 100;
      return startYear + '年' + startMonth + '季度';
    }
    let endValue = function () {
      let end = endTime;
      let endYear = (end / 100).toFixed(0);
      let endMonth = end % 100;
      return endYear + '年' + endMonth + '季度';
    }
    let confirm = function (e) {
      if (startTime === 0) {
        _this.val('');
      } else {
        _this.val(startValue() + '~' + endValue());
      }
      _this.parent().find('.wg-picker').removeClass('show');
      _this.parent().find('.mask').removeClass('show');
      e.stopPropagation();
    }
    let reset = function () {
      startTime = 0;
      endTime = 0;
      act = 0;
      _this.parent().find('.wg-input').val(opts.year);
      _this.parent().find('.tishi').removeClass('show');
      activeColor();
    }
    _this.parent().find('.tishi').removeClass('show');
    _this.parent().find('.wg-quarter-wrap').addClass('show').siblings().removeClass('show');
    let list = _this.parent().find('.wg-quarter-wrap').children();
    activeColor();
    _this.parent().find('.wg-quarter-wrap').on('click', '.wg-quarter-list', function () {
      let timeNum = $(this).data("time");
      let start = startTime;
      act++;
      if (act === 1) {
        startTime = timeNum;
        endTime = timeNum;
        _this.parent().find('.tishi').removeClass('show');
      }
      if (act === 2) {
        if (start <= timeNum) {
          endTime = timeNum;
        } else {
          endTime = start;
          startTime = timeNum;
        }
        _this.parent().find('.tishi').addClass('show').text(startValue() + '~' + endValue());
        act = 0;
      }
      activeColor();
    })
    _this.parent().find(".wg-input").on("click", function () {
      _this.parent().find(".year-list").addClass("show");
      let arr = _this.parent().find(".year-list").children();
      $(arr).on("click", function () {
        year = $(this).data("year");
        _this.parent().find(".wg-input").val(year);
        _this.parent().find(".year-list").removeClass("show");
        for (let i = 0; i < list.length; i++) {
          list.eq(i).data('time', year * 100 + (i + 1));
        }
        activeColor();
      });
    });
    _this.parent().find('.confirm').on('click', confirm);
    _this.parent().find('.reset').on('click', reset);
    _this.parent().find('.mask').on('click', confirm);
  }
}