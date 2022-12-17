// Copy function
document.getElementById('idaddress').onclick = async function() {
  var copyText = document.getElementById("address");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  $("#idaddress").text($("#idaddress").text() == 'Identification Address' ? 'Copied Address!' : 'Identification Address');
}

let bank_id = "";
let account_id = "";


App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  init: function() {
  return App.initWeb3();
  },
  initWeb3: function() {
  if (typeof web3 !== 'undefined') {
  // If a web3 instance is already provided by Meta Mask.
  App.web3Provider = web3.currentProvider;
  web3 = new Web3(web3.currentProvider);
  } else {
  // Specify default instance if no web3 instance provided
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
  web3 = new Web3(App.web3Provider);
  }
  return App.initContract();
  },
  initContract: function() {
  $.getJSON("Debitable.json", function(bank) {
  // Instantiate a new truffle contract from the artifact
  App.contracts.Debitable = TruffleContract(bank);
  // Connect provider to interact with contract
  App.contracts.Debitable.setProvider(App.web3Provider);
  return App.render();
  });
  },
  render: function() {
  var bankInstance;
  var loader = $("#loader");
  var content = $("#content");
  loader.show();
  content.hide();
  // Load account data
  web3.eth.getCoinbase(function(err, account) {
  if (err === null) {
  App.account = account;
  account_id = account;
  }
  });
  // Load contract data
  App.contracts.Debitable.deployed().then(function(instance) {
  bankInstance = instance;
  return bankInstance.candidatesCount();
  }).then(function(candidatesCount) {

  loader.hide();
  content.show();
  }).catch(function(error) {
  console.warn(error);
  });
  },

  // Creates a new bank account and initializes the balance
  newWallet: function() {
    $("#initial").fadeOut("normal", function(){
      $("#loader").fadeIn("normal");
    });
    let hold = [];
    App.contracts.Debitable.deployed().then(function(instance) {
    bankInstance = instance;
    return instance.createAcc(500, 500, { from: App.account });
    }).then(function() {
      return bankInstance.candidatesCount().then(function(res){
        let final = res["c"];
        return bankInstance.candidates(final).then(function(account) {
          return bankInstance.accounts(account);
        }).then(function(result) {
          hold.push(result);
          // Generate and Output QR Code
          $("#qr").attr("src", "https://chart.googleapis.com/chart?cht=qr&chl=" + account_id + "&chs=160x160&chld=L|0");
        })
      })
    }).then(function(){
      r = hold[hold.length-1];
      var cash = $("#showCashBalance");
      var bank = $("#showBankBalance");
      var addr = $("#address");

      bank_id = r[0];
      addr.val(r[0]);
      bank.text(r[1]["c"]);  
      cash.text(r[2]["c"]); 
      $("#loader").delay(1000).fadeOut("slow", function() {
        $("#follow").fadeIn("normal");
      })
    });
  },


  authenticateWallet: function() {
    $("#login").fadeOut("normal", function() {
      $("#loader").fadeIn("normal")
    })

    let data = document.getElementById("id").value;
    App.contracts.Debitable.deployed().then(function(instance) {
    bankInstance = instance;
    return instance.balances(data, { from: App.account });
    }).then(function() {
      return bankInstance.accounts(data);
    }).then(function(result) {
      // Generate and Output QR Code
      $("#qr").attr("src", "https://chart.googleapis.com/chart?cht=qr&chl=" + account_id + "&chs=160x160&chld=L|0");
      r = result;
      var cash = $("#showCashBalance");
      var bank = $("#showBankBalance");
      var addr = $("#address");

      addr.val(r[0]);
      bank.text(r[1]["c"][0]);  
      cash.text(r[2]["c"][0]);   
      $("#loader").delay(1000).fadeOut("slow", function() {
        $("#follow").fadeIn("normal");
      })
    })
  },


  withdraw: function() {
    let data = bank_id;
    let history_hash = "";
    let amount = document.getElementById("amount").value;
    App.contracts.Debitable.deployed().then(function(instance) {
    bankInstance = instance;
    return instance.withdraw(data, amount, { from: App.account });
    }).then(function(receipt) {
      history_hash = receipt.tx;
      return bankInstance.accounts(data);
    }).then(function(result) {
      console.log(r);
      r = result;
      var cash = $("#showCashBalance");
      var bank = $("#showBankBalance");
      var addr = $("#address");
      addr.val(r[0]);
      bank.text(r[1]["c"][0]);  
      cash.text(r[2]["c"][0]); 

      let date_ob = new Date();
      // current hours
      let hours = date_ob.getHours();
      // current minutes
      let minutes = date_ob.getMinutes();
      // current seconds
      let seconds = date_ob.getSeconds();

      let prep = `<li>
      <div class="payment-card">
        <div class="hour">${hours}:${minutes}:${seconds}</div>
        <div class="price negative">-${amount} AC</div>
        <div class="token" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
          ${history_hash}
        </div>
        <div class="score blue">•••</div>
        </div>
      </li>`

      $("#history").prepend(prep);

      $("#amount").val("");
    })
  },


  deposit: function() {
    let data = bank_id;
    let history_hash = "";
    let amount = document.getElementById("amount").value;
    App.contracts.Debitable.deployed().then(function(instance) {
    bankInstance = instance;
    return instance.deposit(data, amount, { from: App.account });
    }).then(function(receipt) {
      history_hash = receipt.tx;
      return bankInstance.accounts(data);
    }).then(function(result) {
      r = result;
      var cash = $("#showCashBalance");
      var bank = $("#showBankBalance");
      var addr = $("#address");
      addr.val(r[0]);
      bank.text(r[1]["c"][0]);  
      cash.text(r[2]["c"][0]); 

      let date_ob = new Date();
      // current hours
      let hours = date_ob.getHours();
      // current minutes
      let minutes = date_ob.getMinutes();
      // current seconds
      let seconds = date_ob.getSeconds();

      let prep = `<li>
      <div class="payment-card">
        <div class="hour">${hours}:${minutes}:${seconds}</div>
        <div class="price positive">+${amount} AC</div>
        <div class="token" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
          ${history_hash}
        </div>
        <div class="score blue">•••</div>
        </div>
      </li>`

      $("#history").prepend(prep);

      $("#amount").val("");
    })
  }

  };
  $(function() {
  $(window).load(function() {
  App.init();
  });
  });
