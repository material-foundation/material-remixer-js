/** @license
 *  Copyright 2016 Google Inc. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */

var template;
var view = {};

function loadTemplate() {
  generateData();

  return new Promise(function(resolve, reject) {
    $.get('src/demo-template.html', function(response) {
      template = response;
      render();
      resolve();
    }).fail(function() {
      reject();
    });
  });
}

function generateData() {
  var totalTransactions = 20;
  var totalAmount = 0;
  var transactions = [];

  // Generate transactions
  for (var i = 0; i < totalTransactions; i++) {
    // Transactions
    var transaction = faker.helpers.createTransaction();
    transaction.date = getDate();
    totalAmount += parseFloat(transaction.amount);

    // Other transactions
    transaction.other = [];
    for (var j = 0; j < totalTransactions; j++) {
      other = faker.helpers.createTransaction();
      other.date = getDate();
      transaction.other.push(other);
    }

    transactions.push(transaction);
  }

  view.transactions = transactions.sort(compare);
  view.selectedTransaction = transactions[0];
  view.totalAmount = toCurrency(totalAmount);
}

function compare(a, b) {
  var date1 = new Date(a.date);
  var date2 = new Date(b.date);
  if (date1 < date2) {
    return -1;
  }
  if (date1 > date2) {
    return 1;
  }
  return 0;
};

function toCurrency(value) {
  return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
}

function getDate() {
  var date = faker.date.between('2017-01-01', new Date());
  return date.toLocaleDateString();
}

function render() {
  var content = $($.parseHTML(template));
  var compiler = Handlebars.compile(content.filter("#layout").html());

  Handlebars.registerPartial({
    leftPanel: content.filter("#left-panel").html(),
    rightPanel: content.filter("#right-panel").html(),
    transactionList: content.filter("#transaction-list").html(),
    transactionDetails: content.filter("#transaction-details").html(),
    transactionOther: content.filter("#transaction-other").html(),
  });

  // Adds selected class to selected transaction item.
  Handlebars.registerHelper('isSelected', function(options) {
    var resp =
      (this.business === view.selectedTransaction.business) ?
      "selected" : "";
    return options.fn(resp);
  });

  // Returns fake detail monthly total.
  Handlebars.registerHelper('monthlyTotal', function(options) {
    var total = toCurrency(parseFloat(this.selectedTransaction.amount) * 12);
    return options.fn(total);
  });

  // Returns fake detail yearly total.
  Handlebars.registerHelper('yearlyTotal', function(options) {
    var total = toCurrency(parseFloat(this.selectedTransaction.amount) * 40);
    return options.fn(total);
  });

  var html = compiler(view);
  $("#demo-app").html(html);

  addClickHandler();
}

function addClickHandler() {
  $('.transaction-list-item').click(function() {
    var index = $('.transaction-list-item').index(this);
    view.selectedTransaction = view.transactions[index];
    render();
  });
}
