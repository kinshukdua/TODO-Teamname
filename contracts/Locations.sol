pragma solidity >=0.4.21 <0.7.0;

contract Locations {
    uint public locationCount = 0;

    struct Location {
        string name;
    }

    mapping(uint => Location) public locations;

    constructor() public {
        createLocation("Chennai, TN");
        createLocation("Delhi, DL");
        createLocation("Mumbai, MH");
    }

    event LocationCreated(
        string name
    );

    function createLocation(string memory _name) public {
        locationCount++;
        locations[locationCount] = Location(_name);
        emit LocationCreated(_name);
    }
}