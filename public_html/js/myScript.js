var winampPapp = angular.module('winampPapp',['ngResource']);

winampPapp.api_key = 'YOUR_API_KEY';
winampPapp.secret = 'YOUR_API_SECRET';

//JSON format
//({
//    "page": 16,
//    "prev_page_endpoint": "https://api.change.org/v1/petitions/1363762/signatures?page=15",
//    "next_page_endpoint": "https://api.change.org/v1/petitions/1363762/signatures?page=17",
//    "total_pages": 19,
//    "signature_count": 12077,
//    "signatures": [{
//            "name": "Stefan Ellermann",
//            "city": null,
//            "state_province": null,
//            "country_code": "DE",
//            "country_name": "Germany",
//            "signed_at": "2013-11-23T13:52:24Z"
//    },
//    {
//            "name": "Maritko Vyb\u00edral",
//            "city": "Czech republic",
//            "state_province": "",
//            "country_code": "",
//            "country_name": null,
//            "signed_at": "2013-11-23T13:53:22Z"
//    }]
//})


