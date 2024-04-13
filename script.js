$(document).ready(function () {
  // Function to calculate tax based on age and income
  function calculateTax() {
    var grossIncome = parseFloat($("#gross-income").val()) || 0;
    var extraIncome = parseFloat($("#extra-income").val()) || 0;
    var deductions = parseFloat($("#deductions").val()) || 0;
    var age = $("#age").val();

    var totalIncome = grossIncome + extraIncome - deductions;
    var taxableIncome = Math.max(totalIncome - 800000, 0); // Taxable income capped at 0 if under 8 Lakhs

    var taxRate = 0;
    if (age === "<40") {
      taxRate = 0.3; // 30% tax rate for age < 40
    } else if (age === ">=40 & <60") {
      taxRate = 0.4; // 40% tax rate for age >= 40 but < 60
    } else if (age === ">=60") {
      taxRate = 0.1; // 10% tax rate for age >= 60
    }

    var taxAmount = taxableIncome * taxRate;

    return {
      taxableIncome: taxableIncome.toFixed(2),
      taxRate: (taxRate * 100).toFixed(2),
      taxAmount: taxAmount.toFixed(2),
    };
  }

  // Function to display tax calculation results in the modal
  function displayTaxResults(results) {
    $("#taxable-income").text(results.taxableIncome);
    $("#tax-rate").text(results.taxRate);
    $("#tax-amount").text(results.taxAmount);
    $("#modal").removeClass("hidden");
  }

  // Close modal function
  function closeModal() {
    $("#modal").addClass("hidden");
  }

  // Submit button click event
  $("#tax-form").submit(function (event) {
    event.preventDefault(); // Prevent the default form submission
    var taxResults = calculateTax();
    displayTaxResults(taxResults);
  });

  // Close button click event
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
