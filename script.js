$(document).ready(function () {
  function calculateTax() {
    var grossIncome = parseFloat($("#gross-income").val()) || 0;
    if (isNaN(grossIncome) || grossIncome < 0) {
      alert("Gross Annual Income cannot be negative or empty.");
      return;
    }
    var extraIncome = parseFloat($("#extra-income").val()) || 0;
    var deductions = parseFloat($("#deductions").val()) || 0;
    var age = $("#age").val();

    var totalIncome = grossIncome + extraIncome - deductions;
    var taxableIncome = Math.max(totalIncome - 800000, 0);

    var taxRate = 0;
    if (age === "<40") {
      taxRate = 0.3;
    } else if (age === ">=40 & <60") {
      taxRate = 0.4;
    } else if (age === ">=60") {
      taxRate = 0.1;
    }

    var taxAmount = taxableIncome * taxRate;

    return {
      taxableIncome: taxableIncome.toFixed(2),
      taxRate: (taxRate * 100).toFixed(2),
      taxAmount: taxAmount.toFixed(2),
    };
  }

  function displayTaxResults(results) {
    $("#taxable-income").text(results.taxableIncome);
    $("#tax-rate").text(results.taxRate);
    $("#tax-amount").text(results.taxAmount);
    $("#modal").removeClass("hidden");
  }

  function closeModal() {
    $("#modal").addClass("hidden");
  }

  $("#tax-form").submit(function (event) {
    event.preventDefault();
    var taxResults = calculateTax();
    displayTaxResults(taxResults);
  });

  $("#close-modal").click(function () {
    closeModal();
  });
  $(".tooltip").hover(
    function () {
      var tooltipText = $(this).attr("data-tooltip");
      $("#tooltip-text").text(tooltipText);
      $("#tooltip-container").removeClass("hidden");
    },
    function () {
      $("#tooltip-container").addClass("hidden");
    }
  );
});
