pragma solidity >=0.4.21 <0.7.0;

contract VaccineDistribution {
    uint public vaccineCount = 0;
    uint public vaccinatedPeople = 0;

    struct Vaccine {
        string barcode;
        string name;
        string manufacturer;
        string locale;
        int temp;
    }

    mapping(uint => Vaccine) public vaccines;

    event VaccineCreated(
        string barcode,
        string name,
        string manufacturer,
        string locale,
        int temp
    );

    event VaccineReceived(
        string barcode,
        string name,
        string vaccineLocation,
        int temp
    );
    

    constructor() public {
        createVaccine("SFFFQJ93", "Covishield", "Serum Institute Of India", "Delhi, WA", -10);
        createVaccine("JDDFD334", "Covaxin", "Bharat Biotech", "Chennai, WA", 0);
        createVaccine("DFSFE238", "Sputnik", "Panacea Biotec", "Hyderabad, WA", 5);
    }

    function createVaccine(string memory _barcode, string memory _name, string memory _manufacturer,
    string memory _locale, int  _temp) public {
        vaccineCount++;
        vaccines[vaccineCount] = Vaccine(_barcode, _name, _manufacturer, _locale, _temp);
        emit VaccineCreated(_barcode, _name, _manufacturer, _locale, _temp);
    }

    function receiveVaccine(uint _id, string memory _vaccineLocation, int _temp) public {
        Vaccine memory _vaccine = vaccines[_id];
        _vaccine.temp = _temp;
        _vaccine.locale = _vaccineLocation;
        vaccines[_id] = _vaccine;
        vaccinatedPeople++;
        emit VaccineReceived(_vaccine.barcode, _vaccine.name, _vaccineLocation, _temp);
    }
    function() external payable {}
}