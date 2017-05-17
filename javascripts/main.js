app.run((FIREBASE_CONFIG) =>{
 firebase.initializeApp(FIREBASE_CONFIG);
});

app.controller("ItemCtrl", ($http, $q, $scope, FIREBASE_CONFIG) =>{
	$scope.showListView = true;
  $scope.mushroomItems = [];
  $scope.searchText = "";

	let getMushrooms = () =>{  //This is the function getting info from Firebase
		let mushrooms = []; //This itemz array only exist in this function
		return $q((resolve, reject) =>{
			$http.get(`${FIREBASE_CONFIG.databaseURL}/mushrooms.json`)
			.then((fbItems)=>{
          var itemCollection = fbItems.data;
          Object.keys(itemCollection).forEach((key) => {
            itemCollection[key].id=key;
            mushrooms.push(itemCollection[key]);
          });
          resolve(mushrooms);
			}).catch((error) =>{
				reject(error);
			});
		});
	};

		let getShrooms = () => {
			getMushrooms().then((shrooms) =>{
				$scope.mushroomItems = shrooms;
			}).catch((error) =>{
				console.log("get Error", error);
			});
		};

		getShrooms();



});