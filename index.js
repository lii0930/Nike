var app = angular.module("myapp", ["ngRoute"]);
app.controller("myCtrl", function ($scope,$rootScope, $routeParams, $http, $anchorScroll) {
  $anchorScroll ();
  $scope.products = [];
  $scope.cartItems = [];
  $http.get("products.json").then(function (response) {
    $scope.products = response.data;
    for (i = 0; i < $scope.products.length; i++) {
      if ($scope.products[i].id == $routeParams.id) {
        $scope.index = i;
      }
    }
  });

  // $scope.product = [];
  



  $scope.addToCart = function (product) {
    if (!$rootScope.cart) {
      $rootScope.cart = [];
    }
    var existingProduct = $rootScope.cart.find(function (item) {
      return item.id === product.id;
    });

    if (typeof existingProduct!==  'undefined') {
      existingProduct.quantity++;
    }
     else {
      product.quantity = 1;
      $rootScope.cart.push(product);
      alert("Thêm thành công")
    }
    localStorage.setItem("cart", JSON.stringify($rootScope.cart));
    console.log();
  };

  

  $scope.sort = function(reverse) {
    $scope.products.forEach(function(product) {
      product.price = parseFloat(product.sell);
    });
    $scope.reverseOrder = reverse;
    $scope.predicate = 'price';
  };
  
  
  // $scope.editProduct = function(product) {
  //   // Code to edit the product
  // };

  // $scope.deleteProduct = function(product) {
  //   // Code to delete the product
  // };
  $scope.calculateProductPrice = function (product) {
    product.totalPrice = product.quantity * product.sell;
    return product.totalPrice;
  };
  $scope.updateCart = function () {
    var totalPrice = 0;
    for (var i = 0; i < $rootScope.cart.length; i++) {
      totalPrice += $scope.calculateProductPrice($rootScope.cart[i]);
    }
    $rootScope.totalCart = totalPrice;
    localStorage.setItem("cart", JSON.stringify($rootScope.cart));
    tong();
  };
    
  $scope.increaseProductQuantity = function (product) {
    product.quantity++;
    $scope.calculateProductPrice(product);
    $scope.updateCart();
  };
  
  $scope.decreaseProductQuantity = function (product) {
    if (product.quantity >= 1) {
      product.quantity--;
      $scope.calculateProductPrice(product);
      $scope.updateCart();
    }
    else{removeCartItem(product);} 
  };
  

  $scope.removeCartItem = function (product) {
    for (var i = 0; i < $rootScope.cart.length; i++) {
      if ($rootScope.cart[i].id == product.id) {
        $rootScope.cart.splice(i, 1);
      }
    }
    $rootScope.totalCart = $rootScope.totalCart - product.totalPrice;
    localStorage.setItem("cart", JSON.stringify($rootScope.cart));
  }
  
  // $scope.calculateCartTotal = function () {
  //   var cartTotal = 0;
  //   for (var i = 0; i < $rootScope.cart.length; i++) {
  //     cartTotal += $rootScope.cart[i].totalPrice;
  //   }
  //   $rootScope.totalCart = cartTotal;
  //   localStorage.setItem("cart", JSON.stringify($rootScope.cart));
  // }
  
  $scope.tong = function () {
    var tong = 0;
    $rootScope.cart.forEach((item) => {
      tong += item.sell * item.quantity;
    });
    return tong;
  };


  $rootScope.phuong = function (txt) {
    $scope.keyword=txt
    // alert($scope.keyword)
  }

});



app.config(function ($routeProvider) {
  $routeProvider
    .when("/dn", {
      templateUrl: "login.html?" + Math.random(),
      controller: "myCtrl"
    })
    .when("/detail/:id", {
      templateUrl: "productdetail.html?" + Math.random(),
      controller: "myCtrl"
    })
    .when("/tc", {
      templateUrl: "index1.html?" + Math.random(),
      controller: "myCtrl"
    })
    .when("/tt", {
      templateUrl: "payment.html?" + Math.random(),
      controller: "myCtrl"
    })
    .when("/sp", {
      templateUrl: "product.html?" + Math.random(),
      controller: "myCtrl"
    })
    .otherwise({
      templateUrl: "index1.html?" + Math.random(),
      controller: "myCtrl"
    });
});

$scope.random=function(){
  var i;
  for(i=0;i<$scope.products.length;i++){
    i = Math.floor(Math.random());
    if(i<=$scope.products.length){
      $scope.products.index=i;
      break;
    }
  }
  return i;
}
app.filter('gender', function() {
  return function(items, gender) {
    var filtered = [];
    angular.forEach(items, function(item) {
      if (item.gender == 'male') {
        filtered.push(item);
      }
      else filtered.push(item);
    });
    return filtered;
  };
});





