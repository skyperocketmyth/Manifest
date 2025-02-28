function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index');
}

// Function to get real-time barcodes from store-specific Google Sheets
function getRealTimeBarcodes(storeName) {
  var sheetIDMap = {
    "Quik Business Bay": "1nZKd4yFR_Lj8lV8z1k17AshR4mdM6xQ_f2PtqG2ZXsA",
    "Quik Business Bay 2": "1XyXfcc06tTI6PtxmcTByyB3GrpHVJrN6rroT8MsacsY",
    "Quik Arjan": "1s9mFSTP-vsC4sYMmPk5P0guzWkJ2F_bFD4AGZBgAa-Q",
    "Quik Barsha": "1hG_3UtwvrLqtgp7VP1hOjkxzyItUFcqhrdNaR1Mgkzw",
    "Quik Concord": "18XIQ5cQBEv9tFzpzeT2xThgpxd3WLiPgyaQlflmr_zc",
    "Quik DFP": "1gk5VlevU6mO8ybXtC6dVC4oajKOxdy2rqhDx1ZFYttA",
    "Quik DFC": "1KDnqEAF6zawsi5E659EcCNy81Gq1N5vfPxhy2z1S5hI",
    "Quik DSO": "1j5a841AfULLHpkCWLD6crUJ-_SCP926RK7Q-q_mTBU8",
    "Quik DWTC": "1mtOdfDpJuL2Zrz182NG0bn_7T84uYAqYsGCVrU35m_s",
    "Quik Etisalat": "1x-BNMtjHk97marpOZ-le8nWmS8Aa1wdVhtFZbOQh-5M",
    "Quik JLT": "1GUYS8JR9ngJAvyiAa76qYpegASxCMXzTh3-Z-rwIDIc",
    "Quik JVC": "1yKeEI2ZbVvpg0q9aqzw2ns0KHzUdriU1CiCn1lkD9BE",
    "Quik Marina": "1Lk4bw0PNEemeulG4uqC556nudatM22jnEHxqOTwGuxo",
    "Quik Motor City": "1Yh5zqCzDFd7X_UykhIxISii6fbfbOZFw599YPEIj1bk",
    "Quik Murjan": "161XYPFFwFWxlomIWA1PRvGvZ9GC9cw2wjEaTot8VTxw",
    "Quik Raffa": "1kjhACcyjR_goJD2MlV2p3qDqstbkpVao2KqDNJOk1A8",
    "Quik Raffa 2": "1DNOHfkgpkIlvENP1yg8PPcPfTHC2sGX5Cr799O6_nyc",
    "Quik Raha": "14hY9drWeHdaxZVDSdrMEP0Yx13qgKSHw8Y9lUkFFKQA",
    "Quik Safa": "1vxvKd1LeRZHCFSnm2eLNoj0XCozayNxOyFTc-1SRbwU",
    "Quik Umm Suqueim": "1XRMkqrolu2cEmbQExnemAHugwJZnkRa0ywgOJnALCXs"
  };
  var sheetNameMap = {
    "Quik Business Bay": "QUIK_BB (Upload)",
    "Quik Business Bay 2": "QUIK_BB2 (Upload)",
    "Quik Arjan": "QUIK_Arjan (Upload)",
    "Quik Barsha": "QUIK_Barsha (Upload)",
    "Quik Concord": "QUIK_Concord (Upload)",
    "Quik DFP": "QUIK_DFP (Upload)",
    "Quik DFC": "QUIK_DFC (Upload)",
    "Quik DSO": "QUIK_DSO (Upload)",
    "Quik DWTC": "Quik_DWTC (Upload)",
    "Quik Etisalat": "Quik_Etisalat (Upload)",
    "Quik JLT": "Quik_JLT (Upload)",
    "Quik JVC": "Quik_JVC (Upload)",
    "Quik Marina": "Quik_Marina (Upload)",
    "Quik Motor City": "Quik_Motor City (Upload)",
    "Quik Murjan": "Quik_Murjan (Upload)",
    "Quik Raffa": "Quik_Raffa (Upload)",
    "Quik Raffa 2": "Quik_Raffa 2 (Upload)",
    "Quik Raha": "Quik_Raha (Upload)",
    "Quik Safa": "Quik_Safa (Upload)",
    "Quik Umm Suqueim": "Quik_Umm Suqueim (Upload)",
  };
  if (!sheetIDMap[storeName]) {
    return [];
  }
  var ss = SpreadsheetApp.openById(sheetIDMap[storeName]);
  var sheet = ss.getSheetByName(sheetNameMap[storeName]);
  if (!sheet) return [];
  var data = sheet.getRange("E:E").getValues().flat();
  return data.filter(String);
}

// New function to get barcodes with their cumulative quantities
function getRealTimeBarcodeData(storeName) {
  var sheetIDMap = {
    "Quik Business Bay": "1nZKd4yFR_Lj8lV8z1k17AshR4mdM6xQ_f2PtqG2ZXsA",
    "Quik Business Bay 2": "1XyXfcc06tTI6PtxmcTByyB3GrpHVJrN6rroT8MsacsY",
    "Quik Arjan": "1s9mFSTP-vsC4sYMmPk5P0guzWkJ2F_bFD4AGZBgAa-Q",
    "Quik Barsha": "1hG_3UtwvrLqtgp7VP1hOjkxzyItUFcqhrdNaR1Mgkzw",
    "Quik Concord": "18XIQ5cQBEv9tFzpzeT2xThgpxd3WLiPgyaQlflmr_zc",
    "Quik DFP": "1gk5VlevU6mO8ybXtC6dVC4oajKOxdy2rqhDx1ZFYttA",
    "Quik DFC": "1KDnqEAF6zawsi5E659EcCNy81Gq1N5vfPxhy2z1S5hI",
    "Quik DSO": "1j5a841AfULLHpkCWLD6crUJ-_SCP926RK7Q-q_mTBU8",
    "Quik DWTC": "1mtOdfDpJuL2Zrz182NG0bn_7T84uYAqYsGCVrU35m_s",
    "Quik Etisalat": "1x-BNMtjHk97marpOZ-le8nWmS8Aa1wdVhtFZbOQh-5M",
    "Quik JLT": "1GUYS8JR9ngJAvyiAa76qYpegASxCMXzTh3-Z-rwIDIc",
    "Quik JVC": "1yKeEI2ZbVvpg0q9aqzw2ns0KHzUdriU1CiCn1lkD9BE",
    "Quik Marina": "1Lk4bw0PNEemeulG4uqC556nudatM22jnEHxqOTwGuxo",
    "Quik Motor City": "1Yh5zqCzDFd7X_UykhIxISii6fbfbOZFw599YPEIj1bk",
    "Quik Murjan": "161XYPFFwFWxlomIWA1PRvGvZ9GC9cw2wjEaTot8VTxw",
    "Quik Raffa": "1kjhACcyjR_goJD2MlV2p3qDqstbkpVao2KqDNJOk1A8",
    "Quik Raffa 2": "1DNOHfkgpkIlvENP1yg8PPcPfTHC2sGX5Cr799O6_nyc",
    "Quik Raha": "14hY9drWeHdaxZVDSdrMEP0Yx13qgKSHw8Y9lUkFFKQA",
    "Quik Safa": "1vxvKd1LeRZHCFSnm2eLNoj0XCozayNxOyFTc-1SRbwU",
    "Quik Umm Suqueim": "1XRMkqrolu2cEmbQExnemAHugwJZnkRa0ywgOJnALCXs"
  };
  var sheetNameMap = {
    "Quik Business Bay": "QUIK_BB (Upload)",
    "Quik Business Bay 2": "QUIK_BB2 (Upload)",
    "Quik Arjan": "QUIK_Arjan (Upload)",
    "Quik Barsha": "QUIK_Barsha (Upload)",
    "Quik Concord": "QUIK_Concord (Upload)",
    "Quik DFP": "QUIK_DFP (Upload)",
    "Quik DFC": "QUIK_DFC (Upload)",
    "Quik DSO": "QUIK_DSO (Upload)",
    "Quik DWTC": "Quik_DWTC (Upload)",
    "Quik Etisalat": "Quik_Etisalat (Upload)",
    "Quik JLT": "Quik_JLT (Upload)",
    "Quik JVC": "Quik_JVC (Upload)",
    "Quik Marina": "Quik_Marina (Upload)",
    "Quik Motor City": "Quik_Motor City (Upload)",
    "Quik Murjan": "Quik_Murjan (Upload)",
    "Quik Raffa": "Quik_Raffa (Upload)",
    "Quik Raffa 2": "Quik_Raffa 2 (Upload)",
    "Quik Raha": "Quik_Raha (Upload)",
    "Quik Safa": "Quik_Safa (Upload)",
    "Quik Umm Suqueim": "Quik_Umm Suqueim (Upload)",
  };
  
  if (!sheetIDMap[storeName]) {
    return {};
  }
  
  var ss = SpreadsheetApp.openById(sheetIDMap[storeName]);
  var sheet = ss.getSheetByName(sheetNameMap[storeName]);
  
  if (!sheet) return {};
  
  // Get both barcode and quantity data
  // Column E (index 4) for barcode and Column G (index 6) for quantity
  var dataRange = sheet.getRange("E:G").getValues();
  
  // Create a dictionary to store barcodes and their cumulative quantities
  var barcodeData = {};
  
  // Process each row to accumulate quantities for each unique barcode
  for (var i = 0; i < dataRange.length; i++) {
    var barcode = String(dataRange[i][0]).trim();
    
    // Skip empty barcodes or header rows
    if (!barcode || barcode === "Barcode") continue;
    
    // Parse quantity, default to 1 if invalid
    var quantity = parseInt(dataRange[i][2]);
    if (isNaN(quantity) || quantity <= 0) quantity = 1;
    
    // Accumulate quantities for each barcode
    if (barcodeData[barcode]) {
      barcodeData[barcode] += quantity;
    } else {
      barcodeData[barcode] = quantity;
    }
  }
  
  // Log for debugging
  Logger.log("Barcode data for " + storeName + ": " + JSON.stringify(barcodeData));
  
  return barcodeData;
}

// Function to submit scanned form data to Google Sheet
function submitFormData(formData) {
  try {
    // Validate required fields
    if (!formData.orderDate) {
      throw new Error("Order date is required");
    }
    if (!formData.storeName) {
      throw new Error("Store name is required");
    }
    var sheet = SpreadsheetApp.openById("1qQueBNBPWOy4ximK1WcCtPVJOkXdNKRWCyAbg1bsSFg").getSheetByName("Form Responses");
    
    if (!sheet) {
      throw new Error("Data sheet not found");
    }
    // Log the incoming data for debugging
    Logger.log("Submitting form data: " + JSON.stringify(formData));
    var rowData = [
      new Date(),  // timestamp
      formData.orderDate || "",  // use empty string as fallback
      formData.storeName || "",  // use empty string as fallback
      formData.scanDropID || "",
      formData.PalletID || ""
    ];
    // Add scanned items to the row
    if (Array.isArray(formData.itemScans)) {
      rowData.push(...formData.itemScans);
    } else {
      rowData.push("");  // Add empty string if itemScans is not an array
    }
    sheet.appendRow(rowData);
    return "Success: Data submitted!";
  } catch (error) {
    Logger.log("Error in submitFormData: " + error.toString());
    return "Error: " + error.message;
  }
}
