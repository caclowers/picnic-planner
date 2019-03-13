const app = angular.module('thingApp', []);

app.controller('thingController', ['$http', function ($http) {
    const self = this;
    

    self.getThings = function () {
        $http({
            url: '/picnic-planner',
            method: 'GET'
        }).then(function (response) {
            self.things = response.data;
            console.log('line 13: self.things:', self.things);
        }).catch(function (error) {
            console.log('line 15: GET request error', error);
        });
    };
    
    self.getThings();

    self.addThing = function (newThing) {
        $http({
            url: '/picnic-planner',
            method: 'POST',
            data: newThing
        }).then(function (response) {
            console.log(response);
            self.getThings();

            self.newThing.name = '';
            self.newThing.number = '';
            self.newThing.person = '';
        }).catch(function (error) {
            console.log(error);
        });
    };

    self.deleteThing = function (id) {
       swal({
           title: 'You are about to Delete a thing',
           text: 'Are you sure you want to delete?',
           icon: 'warning',
           buttons: true,
           dangerMode: true,
       }).then((willDelete) => {
         if (willDelete){
           self.byeThing(id); 
           swal('thing has been deleted', {
            icon: 'success',
          }); 
         } else {
             swal('No Worries :)');
         } ;
       });
    };

    self.byeThing = function (id) {
        $http({
            url: `/picnic-planner/${id}`,
            method: 'DELETE'
        }).then(function (response) {
            console.log('line 59: DELETE response:', response);
            self.getThings();
        }).catch(function(error){
            console.log('line 62: DELETE request error:', error);
        });
    };

    self.editThing = function (Thing) {
        console.log('got to thing PUT', Thing);
        $http({
            url: `/picnic-planner/${Thing._id}`,
            method: 'PUT',
            data: Thing
        }).then(function (response){
            console.log(response);
            self.getThings(); 
        }).catch(function (error){
            console.log('line 76: PUT request error:', error);  
        });
    };
}]);