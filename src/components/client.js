// const app = angular.module('TaskApp', []);

// app.controller('TaskController', ['$http', function ($http) {
//     const self = this;
    

//     self.getThings = function () {
//         $http({
//             url: '/toDoList',
//             method: 'GET'
//         }).then(function (response) {
//             self.tasks = response.data;
//             console.log('line 13: self.tasks:', self.tasks);
//         }).catch(function (error) {
//             console.log('line 15: GET request error', error);
//         });
//     };
    
//     self.getThings();

//     self.addThings = function (newTask) {
//         $http({
//             url: '/toDoList',
//             method: 'POST',
//             data: newTask
//         }).then(function (response) {
//             console.log(response);
//             self.getThings();

//             self.newTask.name = '';
//             self.newTask.type = '';
//             self.newTask.priority = '';
//         }).catch(function (error) {
//             console.log(error);
//         });
//     };

//     self.deleteThings = function (id) {
//        swal({
//            title: 'You are about to Delete a Task',
//            text: 'Are you sure you want to delete?',
//            icon: 'warning',
//            buttons: true,
//            dangerMode: true,
//        }).then((willDelete) => {
//          if (willDelete){
//            self.byeThings(id); 
//            swal('Task has been deleted', {
//             icon: 'success',
//           }); 
//          } else {
//              swal('No Worries :)');
//          } ;
//        });
//     };

//     self.byeThings = function (id) {
//         $http({
//             url: `/toDoList/${id}`,
//             method: 'DELETE'
//         }).then(function (response) {
//             console.log('line 59: DELETE response:', response);
//             self.getThings();
//         }).catch(function(error){
//             console.log('line 62: DELETE request error:', error);
//         });
//     };

//     self.editThings = function (task) {
//         console.log('got to Task PUT');
//         $http({
//             url: `/toDoList/${task._id}`,
//             method: 'PUT',
//             data: task
//         }).then(function (response){
//             console.log(response);
//             self.getThings(); 
//         }).catch(function (error){
//             console.log('line 76: PUT request error:', error);  
//         });
//     };
// }]);