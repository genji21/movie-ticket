"use strict";

var movie_data = [];
$(document).ready(function () {
  // var img_src =[
  //     "https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/p/o/poster_thtt_11_1.jpg"
  //     ,"https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/p/o/poster_thtt_11_1.jpg"
  //     ,"https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/b/t/bts_cgv_vietnam_1.jpg",
  //     "https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/p/o/poster_tenet_13_1.jpg",
  //     "https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/r/s/rsz_a_mermaid_in_paris_-_vnese_poster_1.jpg"
  //     ,"https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/m/a/main-poster-aqdd_1.jpg",
  //     "https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/t/n/tnm_poster_shadow_1_1__1.jpg",
  //     "https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/_/i/_i_u_-_international_poster_1__4.jpg",
  //     "https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/c/o/co-hau-gai-350x495_1.jpg",
  //     "https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/n/o/notn_4_poster_vie_1.jpg"
  //     ,
  //     "https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/p/o/poster_hvqv_5_final_1__1.jpg",
  //     "https://www.cgv.vn/media/catalog/product/cache/1/small_image/240x388/dd828b13b1cb77667d034d5f59a82eb6/p/o/poster_1_5.jpg"
  // ];
  // goi len server de lay du lieu
  // https://5f5baf8f044570001674d1fa.mockapi.io/api/movie_list - get dữ liệu
  // chỉ gọi movie_data khi mà đã gọi lên server thành công qua function getDataMovies 
  function getDataMovies() {
    //     promise : bat dong bo
    //     1: thanh cong =>then
    //     2 : that bai =>catch
    //     hàm fetch sẽ trả về một promise 
    //     fetch('https://5f5baf8f044570001674d1fa.mockapi.io/api/movie_list').then((data)=>{
    //         .json tra ve mot promise moi  
    //              nếu như trong then  ,return một promise mới thì tiếp tục .then sau đó      
    //             return data.json()  
    // })
    //  chainning
    //     .then((dulieu)=>{
    //         console.log(dulieu)
    //     })
    //     .catch((error)=>{
    //         console.log("#error",error)
    //     })
    $.ajax('https://5f5baf8f044570001674d1fa.mockapi.io/api/movie_list', {
      success: function success(data) {
        $("#movie_loading").hide();
        movie_data = data;
        renderUI(); // renderSeats();
        // console.log("#data",data)
      },
      error: function error(err) {
        console.log("#err", err);
      }
    });
  }

  getDataMovies();

  function renderUI() {
    movie_data.forEach(function (movie) {
      $('#movie-carousel').append("\n                   <div class=\"item\" > \n                   <div class=\"card\">\n                   <img  id=\"".concat(movie.id, "\"\n                   src=\"").concat(movie.src, "\" \n                   alt=\"").concat(movie.name, "\" \n                   class=\"card-img-top\"\n                   onclick =\"showInfo(event)\"\n                   />\n                   </div>\n                   </div>\n        "));
    });
    $('#movie-carousel').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 5
        }
      }
    });
    slot_date.innerHTML = moment(Date.now()).format("DD-MM-YYYY");
    dropdown_value.innerHTML = "Bạn chưa chọn phim";
  } // 


  $(window).scroll(function (e) {
    var scroll_top = window.scrollY;

    if (scroll_top > 80) {
      $('header').addClass('header-active');
    } else {
      $('header').removeClass('header-active');
    }
  });
});
var dropdown_value = document.getElementsByClassName('dropdown-value')[0];
var dropdown_menu = document.querySelector('.dropdown-time .dropdown-menu');
var slot_date = document.getElementById('date-time');
var time_left_value = document.querySelector(".time-left h4");
var seats = document.getElementsByClassName('seats')[0];
var seats_container = document.querySelector("#seat-container .container");
var seat_list_selected = document.querySelector(".seat-list-selected>p");
console.log(seat_list_selected);
console.log(seats); // default value

var time_index = 0;
var total_seats = 40;
var listArraySeat = [];

function generateDropDownItem(value, index) {
  return "<a class=\"dropdown-item\" href=\"#\" onclick=\"changeIndex(".concat(index, ")\" data-index=\"").concat(index, "\">").concat(value, "</a>");
}

function generateSeat(index, booked, price) {
  var seatsList = document.createElement('div'); //     // console.log(seatsList)
  //     // console.log(childSeat)

  seatsList.classList = "seat ".concat(index);
  seatsList.innerHTML = " \n  <div class=\"seat ".concat(booked ? 'booked' : '', "\" onclick=\"select(").concat(index, ")\" \n   data-price = \"").concat(price, "\">\n        <img src=\"img/seat01.png\" alt=\"\" >\n        <p>").concat(index, "</p>\n    </div>"); // //   const childSeat = document.querySelectorAll(".seat");
  // //    child_seat = document.getElementsByClassName("seat");
  //     // console.log(child_seat)
  //     console.log(seatsList.innerHTML)

  return seatsList;
}

function changeIndex(index) {
  event.preventDefault(); // ngan chan hanh dong mac dinh cua su kien   

  time_index = index;
  var slots = select_movied.slots;
  console.log("slot time index la ".concat(time_index));
  console.log(select_movied);
  dropdown_value.innerHTML = moment(slots[time_index].time).format('DD-MM-YYYY HH:mm a');
  slot_date.innerHTML = moment(slots[time_index].time).format('ddd MMM,DD YYYY');
  var time_remain = (slots[time_index].time - Date.now()) / 1000; //thoi gian bat dau - thoi gian hien tai = thoi gian con lai toi bo phim

  console.log(time_remain);

  if (time_remain > 0) {
    time_left_value.innerHTML = "".concat(Math.floor(time_remain / 360), "H:").concat(Math.floor(time_remain % 60), " ");
  } else {
    time_left_value.innerHTML = "00:00";
  }

  renderSeats();
}

function showInfo(event) {
  // alert(event.target.src)
  var movie_name = event.target.alt;
  var list_seat = document.querySelectorAll('.seat');
  var id = event.target.id;
  console.log(id); // time_index = 0;
  // console.log(id)

  $('#movie_detail h3').text(movie_name);
  select_movied = movie_data.find(function (movie) {
    return movie.id == id;
  });
  var slots = select_movied.slots;
  dropdown_menu.querySelectorAll('*').forEach(function (n) {
    return n.remove();
  }); // dropdown_value.text =slot[0]
  // flag = false;
  // console.log(slots);

  if (slots) {
    slots.forEach(function (slot, id) {
      dropdown_menu.innerHTML += generateDropDownItem(moment(slot.time).format('DD-MM-YYYY HH:mm a'), id);
    });
    renderSeats(); //  moment dinh dang ngay thang 
    //  const  ngaythang =

    dropdown_value.innerHTML = moment(slots[time_index].time).format('DD-MM-YYYY HH:mm a');
    slot_date.innerHTML = moment(slots[time_index].time).format('ddd MMM,DD YYYY');
  } else if (!slots) {
    dropdown_value.innerHTML = "Het suat";
    slot_date.innerHTML = "Ko có lịch chiếu"; // flag= false;
    // console.log(list_seat)

    list_seat.forEach(function (n) {
      n.remove();
    });
  }
}

function renderSeats() {
  var booked = select_movied.slots[time_index].bookseated;
  var price = select_movied.slots[time_index].price;
  console.log(booked);
  console.log(price);
  list_seat = document.querySelectorAll('.seat'); // console.log()

  list_seat.forEach(function (n) {
    n.remove();
  });

  if (booked) {
    for (var i = 0; i < 40; i++) {
      var isbooked = booked.indexOf(i) >= 0; // seats.remove(1)

      seats.append(generateSeat(i, isbooked, price));
    }
  }
}

var total = 0;

function select(index) {
  console.log(event.target.nodeName); // seat = $(".seat");

  if (event.target.nodeName == "DIV") {
    if ($(event.target).hasClass("booked")) {
      alert("ghế đã đặt ");
    } else {
      $(event.target).toggleClass("selected");
      ; // total += 200;

      console.log(total);
      console.log(listArraySeat);

      if (listArraySeat.indexOf(index) >= 0) {
        listArraySeat = listArraySeat.filter(function (seat) {
          return seat !== index;
        });
        console.log(total);
      } else {
        listArraySeat.push(index);
      }

      document.querySelector('.seat-list-price>.seat-list-h4+p').innerHTML = 200 * listArraySeat.length; //    document.querySelector('.seat-list-price>.seat-list-h4+p').innerHTML = total;

      seat_list_selected.innerHTML = listArraySeat;
    }
  }
}