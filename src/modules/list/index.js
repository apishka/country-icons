import languages from 'languages.json';

class LangList {
    constructor($scope)
    {
        $scope.list = languages.list;
    }
}

export default LangList;