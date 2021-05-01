pragma solidity >=0.4.21 <0.7.0;

contract VaccineDistribution {
    uint public vaccineCount = 0;
    uint public certCount = 0;

    struct Vaccine {
        string barcode;
        string name;
        string manufacturer;
        string locale;
        int temp;
    }
    struct Cert {
        string name;
        string aadhar;
        string timestamp;
        string barcode;
        string vacname;
        string tx_hash;
    }

    mapping(uint => Vaccine) public vaccines;
    mapping(uint => Cert) public certs;

    event CertCreated (
        string name,
        string aadhar,
        string timestamp
    );

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
        //receiveVaccine(1, "Kinshuk", "12345678", "12122134241", "Covishield");

        //receiveVaccine(2, "Test", "123232141342", "9999999999", "Covaxin");
    }

    function createVaccine(string memory _barcode, string memory _name, string memory _manufacturer,
    string memory _locale, int  _temp) public {
        vaccineCount++;
        vaccines[vaccineCount] = Vaccine(_barcode, _name, _manufacturer, _locale, _temp);
        emit VaccineCreated(_barcode, _name, _manufacturer, _locale, _temp);
    }

    function addHash(uint _id, string memory tx_hash) public {
        Cert memory _cert = certs[_id];
        _cert.tx_hash = tx_hash;
        certs[_id] = _cert;
    }

    function receiveVaccine(uint _id, string memory name, string memory aadhar, string memory timestamp, string memory vacname) public {
        Cert memory _cert;
        _cert.name = name;
        _cert.aadhar = aadhar;
        _cert.timestamp = timestamp;
        _cert.vacname = vacname;
        certCount++;
        certs[_id] = _cert;
        emit CertCreated(_cert.name, _cert.aadhar, _cert.timestamp);
    }
    function() external payable {}
}