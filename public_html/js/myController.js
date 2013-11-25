
winampPapp.controller("MainCTRL", function(_, $scope, changeOrgService){
    var sigList = changeOrgService.getSignatures('1363762').get();    
    
    $scope.loading = false;
    $scope.phFilterStatus = true;
    
    $scope.theList = [];
    $scope.theListFromPh = [];
    
    $scope.page = 0;
    $scope.total_pages = 0;
    $scope.page_has_next = sigList.next_page_endpoint !== null ? true : false;

    $scope.getAllFromPh = function(){
        if($scope.page_has_next){
            $scope.loading = true;
            var data = changeOrgService.getSignatures('1363762').get({page: ++$scope.page}, function(result){
              
               $scope.theList = $scope.theList.concat(result.signatures);
               $scope.page = result.page;
               $scope.total_pages = result.total_pages;
               $scope.page_has_next = result.next_page_endpoint !== null ? true : false;
               
               $scope.getAllFromPh(); // get next set of 500      
            });  
        }else{
            $scope.loading = false;
            $scope.phFilterStatus = false;
        }
    };
    
    $scope.filterFromPh = function(){
        alert("test");
        $scope.theListFromPh = _.where($scope.theList, {"country_code": "PH"});
    };
    
});

winampPapp.factory('changeOrgService', function($resource){

    var _changeOrg = {};
    
    // Pass ID to get signatures
    _changeOrg.getSignatures = function(petitionId){
        var baseUrl = 'https://api.change.org/v1/petitions';
        return $resource(baseUrl + '/:id/signatures?api_key=' + winampPapp.api_key + "&callback=JSON_CALLBACK",{id: petitionId}, 
            { get: { method: 'JSONP', params: { page: 1} }});
    };

    // Pass the petition URL to get ID
    _changeOrg.getPetitionId = function(url){
        var baseUrl = 'http://api.change.org/v1/petitions/get_id';
        return $resource(baseUrl, {},
            { get: {method: 'JSONP'}, params:{api_key: winampPapp.api_key, petition_url: url, callback: 'JSON_CALLBACK'}});
    };

    return _changeOrg;
    
});

winampPapp.factory('_', function() {
    return window._; // underscore has been loaded before this script
}); 

/*
    this.getSignatures = function($scope){        
        $http.jsonp('https://api.change.org/v1/petitions/1363762/signatures?api_key=e29974d554ddda437b54e5ed180109dfb9455bd750800a8feb9f993b3d2cd018&callback=JSON_CALLBACK')
            .success(function(result){
                $scope.signatures = result.signatures;
            }
        );
    };

    this.getPetitionId = function($scope) {
        $http.jsonp('http://api.change.org/v1/petitions/get_id?api_key=e29974d554ddda437b54e5ed180109dfb9455bd750800a8feb9f993b3d2cd018&petition_url=https%3A%2F%2Fwww.change.org%2Fen-AU%2Fpetitions%2Faol-keep-winamp-alive-or-let-it-go-open-source&callback=JSON_CALLBACK')
            .success(function(result){
                return result.petition_id;
            }
        );
    };
*/