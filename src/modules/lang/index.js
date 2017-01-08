"use strict";

import languages from 'languages.json';

class LangPage {
    constructor($scope, $stateParams)
    {
        $scope.lang = $stateParams.lang;
        $scope.sizes = languages.sizes;
    }
}

export default LangPage;