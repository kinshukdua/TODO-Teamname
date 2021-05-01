
App = {
    loading: false,
    contracts: {},
    load: async () => {
        await App.loadBlockchain();
        await App.loadAccount();
        await App.loadVaccineDistribution();
        await App.loadLocations();
        await App.render();
    },

    loadBlockchain: async () => {


        if (typeof web3 !== 'undefined') {
          App.web3Provider = web3.currentProvider
          web3 = new Web3(web3.currentProvider)
        } else {
          window.alert("Please connect to Metamask.")
        }
        // Modern dapp browsers...
        if (window.ethereum) {
          window.web3 = new Web3(ethereum);
          try {
            // Request account access if needed
            await ethereum.enable()
          } catch (error) {
            console.log(error);
            // User denied account access...
          }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
          App.web3Provider = web3.currentProvider
          window.web3 = new Web3(web3.currentProvider)
          // Acccounts always exposed
          web3.eth.sendTransaction({/* ... */})
        }
        // Non-dapp browsers...
        else {
          console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },

    loadAccount: async () => {
        App.account = web3.eth.accounts[0];
        console.log(App.account);
        var someVarName = localStorage.getItem("someVarKey");
        document.getElementById("fin-hash").innerHTML = someVarName;
    },

    loadVaccineDistribution: async() => {
        // Create a JavaScript version of the smart contract
        const vaccineDistr = await $.getJSON('VaccineDistribution.json');
        App.contracts.VaccineDistribution = TruffleContract(vaccineDistr);
        App.contracts.VaccineDistribution.setProvider(App.web3Provider);
        
        // Hydrate the smart contract with values from the blockchain
        App.vaccineDistr = await App.contracts.VaccineDistribution.deployed();
        console.log(App.vaccineDistr.address);
    },

    loadLocations: async() => {
        // Create a JavaScript version of the smart contract
        const locations = await $.getJSON('Locations.json');
        App.contracts.Locations = TruffleContract(locations);
        App.contracts.Locations.setProvider(App.web3Provider);
        
        // Hydrate the smart contract with values from the blockchain
        App.locations = await App.contracts.Locations.deployed();
    },

    render: async() => {
        // Prevent double render
        if(App.loading) {
            return;
        }

        // Update app loading state
        App.setLoading(true);

        // Render Account
        $("#account").html(App.account);

        // Render Tasks
        await App.renderForm();
        await App.renderVaccineGrid();
        await App.renderVaccineList();
        await App.renderLocationList();
        await App.renderCertGrid();

        // Update loading state
        App.setLoading(false);
    },

    renderForm: async () => {
      const $form = $('form');
      $form.show();
    },

    renderVaccineGrid: async () => {
        // Load the total vaccine count from the blockchain
        const vaccineCount = await App.vaccineDistr.vaccineCount();
        const $vaccineTemplate = $('.vaccineTemplate');

        // Render out each vaccine with a new vaccine template
        for(var i = 1; i <= vaccineCount; i++) {
            // Fetch the task data from the blockchain
            const vaccine = await App.vaccineDistr.vaccines(i);
            const vaccineBarcode = vaccine[0];
            const vaccineName = vaccine[1];
            const vaccineManufacturer = vaccine[2];
            const vaccineLocation = vaccine[3];
            const vaccineTemp = vaccine[4].toString();

            // Create the html for the vaccine
            const $newVaccineTemplate = $vaccineTemplate.clone();
            $newVaccineTemplate.find('.name').html(vaccineName);
            $newVaccineTemplate.find('.barcode').html(vaccineBarcode);
            $newVaccineTemplate.find('.manufacturer').html(vaccineManufacturer);
            $newVaccineTemplate.find('.location').html(vaccineLocation);
            $newVaccineTemplate.find('.temp').html(vaccineTemp + "°C");

            if(vaccineTemp < 2 || vaccineTemp > 8) {
              $newVaccineTemplate.find('.temp').addClass("badge-danger");
            } else {
              $newVaccineTemplate.find('.temp').addClass("badge-success");
            }

            $('#vaccineList').append($newVaccineTemplate);

            // Show the vaccine
            $newVaccineTemplate.show();
        }
    },
    
    renderCertGrid: async () => {
      // Load the total vaccine count from the blockchain
      const vaccineCount = await App.vaccineDistr.certCount();
      const $vaccineTemplate = $('.certTemplate');

      // Render out each vaccine with a new vaccine template
      for(var i = 1; i <= vaccineCount; i++) {
          // Fetch the task data from the blockchain
          const cert = await App.vaccineDistr.certs(i);
          const name = cert[0];
          const aadhar = cert[1];
          const timestamp = cert[2];
          // Create the html for the vaccine
          const $newVaccineTemplate = $vaccineTemplate.clone();
          $newVaccineTemplate.find('.name2').html(name);
          $newVaccineTemplate.find('.aadhar').html(aadhar);
          $newVaccineTemplate.find('.timestamp').html(timestamp);

          $('#certList').append($newVaccineTemplate);

          // Show the vaccine
          $newVaccineTemplate.show();
      }
  },

    renderVaccineList: async () => {
        // Load the total vaccine count from the blockchain
        const vaccineCount = await App.vaccineDistr.vaccineCount();
        const $vaccineTemplate = $('.selectVaccineTemplate');

        // Render out each vaccine with a new select vaccine template
        for(var i = 1; i <= vaccineCount; i++) {
          // Fetch the task data from the blockchain
          const vaccine = await App.vaccineDistr.vaccines(i);
          const vaccineBarcode = vaccine[0];
          const vaccineName = vaccine[1];

          // Create the html for the vaccine
          const $newVaccineTemplate = $vaccineTemplate.clone();
          $newVaccineTemplate.prop('value', i);
          $newVaccineTemplate.html(vaccineName + ": " + vaccineBarcode);

          $('#vaccineDropdownList').append($newVaccineTemplate);

          // Show the vaccine
          $newVaccineTemplate.prop('disabled', false);
        }
    },
    /*
    renderCertList: async () => {
      // Load the total vaccine count from the blockchain
      const vaccineCount = await App.vaccineDistr.certCount();
      const $vaccineTemplate = $('.selectVaccineTemplate');

      // Render out each vaccine with a new select vaccine template
      for(var i = 1; i <= vaccineCount; i++) {
        // Fetch the task data from the blockchain
        const vaccine = await App.vaccineDistr.vaccines(i);
        const vaccineBarcode = vaccine[0];
        const vaccineName = vaccine[1];

        // Create the html for the vaccine
        const $newVaccineTemplate = $vaccineTemplate.clone();
        $newVaccineTemplate.prop('value', i);
        $newVaccineTemplate.html(vaccineName + ": " + vaccineBarcode);

        $('#vaccineDropdownList').append($newVaccineTemplate);

        // Show the vaccine
        $newVaccineTemplate.prop('disabled', false);
      }
  },*/

    renderLocationList: async () => {
      // Load the total location count from the blockchain
      const locationCount = await App.locations.locationCount();
      const $selectLocationTemplate = $('.selectLocationTemplate');

      // Render out each vaccine with a new select vaccine template
      for(var i = 1; i <= locationCount; i++) {
        // Fetch the task data from the blockchain
        const location = await App.locations.locations(i);
        const locationName = location;

        // Create the html for the vaccine
        const $newSelectLocationTemplate = $selectLocationTemplate.clone();
        $newSelectLocationTemplate.prop('value', i);
        $newSelectLocationTemplate.html(locationName);

        $('#locationDropdownList').append($newSelectLocationTemplate);

        // Show the vaccine
        $newSelectLocationTemplate.prop('disabled', false);
      }
  },

    receiveVaccine: async () => {
      const name = $('#nme').val();
      const aadhar = $('#add').val();
      App.setLoading(true);
      var certId =  await App.vaccineDistr.certCount();
      certId = parseInt(certId)+1;
      const ts = new Date().getTime().toString();
      web3.eth.defaultAccount = web3.eth.accounts[0]
      console.log(await App.vaccineDistr.vaccineCount.call());
      try {
        const h = await App.vaccineDistr.receiveVaccine(certId, name, aadhar,ts,"Covishield");
        localStorage.setItem("hash", h);

    }
    catch(err)
    {
      console.log(err);
      setTimeout(() => {  console.log("World!"); }, 10000);
      
    }
      window.location.reload();
    },

    setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')
        if (boolean) {
          loader.show()
          content.hide()
        } else {
          loader.hide()
          content.show()
        }
    }
}

$(() => {
    $(window).load(() => {
        App.load();
    });
});