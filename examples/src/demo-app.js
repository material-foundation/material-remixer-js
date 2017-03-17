var totalTransactions = 20;
var view = {};
var transactions = [];
var otherTransactions = [];
var totalAmount = 0;

for (var i = 0; i < totalTransactions; i++) {
  // Transactions
  var transaction = faker.helpers.createTransaction();
  transaction.date = new Date(transaction.date).toLocaleDateString();
  totalAmount += parseFloat(transaction.amount);

  // Other transactions
  transaction.other = [];
  for (var j = 0; j < totalTransactions; j++) {
    other = faker.helpers.createTransaction();
    other.date = new Date().toLocaleDateString();
    transaction.other.push(other);

  }

  transactions.push(transaction);
}
view.transactions = transactions;
view.selectedTransaction = transactions[0];
// Format currency
view.totalAmount = totalAmount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();

var html;
var compiler;

function loadTemplate() {

  $.get('src/demo-template.html', function(template) {
    compile(template);
    render();
  });

  function addClickHandler() {
    $('.transaction-list-item').click(function() {
      var index = $('.transaction-list-item').index(this);
      view.selectedTransaction = transactions[index];

      html = compiler(view);
      render();
    });
  }

  function compile(template) {
    var content = $($.parseHTML(template));
    compiler = Handlebars.compile(content.filter("#layout").html());

    Handlebars.registerPartial({
      leftPanel: content.filter("#left-panel").html(),
      rightPanel: content.filter("#right-panel").html(),
      transactionList: content.filter("#transaction-list").html(),
      transactionDetails: content.filter("#transaction-details").html(),
      transactionOther: content.filter("#transaction-other").html(),
    });

    Handlebars.registerHelper('isSelected', function(options) {
      var resp =
        (this.business === view.selectedTransaction.business) ? "selected" : "";
      return options.fn(resp);
    });

    html = compiler(view);
  }

  function render() {
    $("body").html(html);
    addClickHandler();
  }
}
