// Create JSON array for kB API

let kBObj = {
  kBCustomerPO: "",
  kBDiameter: 0,
  kBDrainPort: true,
  kBDrainPortLocation: "Bottom",
  kBDrainPortOffset: 0,
  kBDrainPortSize: 0,
  kBDrawingDescription: "",
  kBDrawingNumber: "",
  kBDrawingRevision: "A", // EDITTED UNTIL WE CAN USE REV ZERO LIVE
  kBDrawnBy: "kBridge",
  kBDrawnByDate: "",
  kBFormFactor: "",
  kBHeight: 0,
  kBInlet0Connection: "",
  kBInlet0DistanceCenterline: 0,
  kBInlet0DistanceCenterlinePlane: 0,
  kBInlet0DistanceEnd: 0,
  kBInlet0FaceOffset: 0,
  kBInlet0Location: "",
  kBInlet0Orientation: "",
  kBInlet0Size: 0,
  kBInlet0XOffset: 0,
  kBInlet0YOffset: 0,
  kBInlet1Connection: "",
  kBInlet1DistanceCenterline: 0,
  kBInlet1DistanceCenterlinePlane: 0,
  kBInlet1DistanceEnd: 0,
  kBInlet1FaceOffset: 0,
  kBInlet1Location: "",
  kBInlet1Orientation: "",
  kBInlet1Size: 0,
  kBInlet1XOffset: 0,
  kBInlet1YOffset: 0,
  kBInletQty: "S",
  kBInletQtyInt: 1,
  kBLength: 0,
  kBLiftingLug: false,
  kBLiftingLugQty: 0,
  kBLiftingLugSize: 0,
  kBLiftingLugThickness: 0,
  kBMaterialConstruction: "",
  kBMountType: "",
  kBOAL: 0,
  kBOEMNumber: "",
  kBOrientation: "Horizontal",
  kBOutletConnection: "",
  kBOutletDistanceCenterline: 0,
  kBOutletDistanceCenterlinePlane: 0,
  kBOutletDistanceEnd: 0,
  kBOutletFaceOffset: 0,
  kBOutletLocation: "E",
  kBOutletOrientation: "E",
  kBOutletQty: "S",
  kBOutletQtyInt: 1,
  kBOutletSize: 0,
  kBOutletXOffset: 0,
  kBOutletYOffset: 0,
  kBPaint: "High-Temp Black Type 5",
  kBProjectName: "",
  kBProposalNumber: "",
  kBReviewDate: "",
  kBReviewed: "",
  kBSalesDrawingDescription: "", // DRAWING/NUMBER REVERSED IN KB LAYOUT
  kBSalesDrawingNumber: "PRE-SALES DRAWING", // DRAWING/NUMBER REVERSED IN KB LAYOUT. EDITTED UNTIL WE CAN USE REV ZERO LIVE
  kBSalesOrderNumber: "",
  kBSparkBox: false,
  kBSupportDistanceBetween: 0,
  kBSupportDistanceCenterline: 0,
  kBSupportDistanceEnd: 0,
  kBSupportHoleSize: 0,
  kBSupportHoleWidths: 0,
  kBWeight: "",
  kBWidth: 0,
};

/*
 *
 * START
 *
 */

// set outlet size for debugging since set debug input is not working correctly

if (
  set.resultStandardSet.selectedSize != 0 &&
  set.resultStandardSet.selectedSize !== null
) {
  kBObj.kBOutletSize = set.resultStandardSet.selectedSize;
} else {
  kBObj.kBOutletSize = 16;
}

// LOAD CONFIG JSON
let configComplete = cfg.silencerInputSizeInformationComplete;
let model = cfg.silencerSeries + cfg.silencerGrade;
let modelSize = model + "-" + kBObj.kBOutletSize;

/*

EXCEPTIONS:
* PER ADO-9661: 
    * Leave Blank until further notice:
        * kBObj.kBReviewDate
        * kBObj.kBReviewed
        * kBObj.kBSalesOrderNumber
        * kBObj.kBCustomerPO
        * kBObj.kBDrawingRevision
        * kBObj.kBOEMNumber

    * Hard Coded
        * kBObj.kBDrawnBy
        * kBObj.kBOutletQty
        * kBObj.kBOutletXOffset
        * kBObj.kBOutletYOffset
        * kBObj.kBPaint
        * kBObj.kBDrainPort
        * kBObj.kBDrainPortLocation
        * kBObj.kBDrawingDescription
*/

/*
 * REQUIRES SF/CPQ MODIFICATION *** UPDATE ****
 *
 */

kBObj.kBProjectName = cfg.opportunityName_Logik;
kBObj.kBProposalNumber = cfg.quoteNumber;

/*
 * Direct Input Text Fields
 * MISSING FROM KB DOCUMENTATION
 *
 */

// SALES DRAWING
// salesDrawingNumber

// SALES DRAWING DESC
// salesDrawingDescription

if (configComplete == true) {
  /*
   * ONE:ONE FIELD MATCHES, MISC
   */

  if (cfg.overridePN == true) {
    kBObj.kBDrawingNumber = cfg.overridePNValue;
  } else {
    kBObj.kBDrawingNumber = cfg.silencerPartNumber;
  }

  let today = Date.now();
  kBObj.kBDrawnByDate =
    today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate(); //YYY-MM-DD

  /*
   * SIMPLE TEXT TRANSLATIONS/RULES
   */

  // Logik/kBridge mismatch
  if (cfg.silencerFormFactor == "Cylindrical") {
    kBObj.kBFormFactor = "Cylinder";
  } else {
    kBObj.kBFormFactor = cfg.silencerFormFactor;
  }

  // MATERIAL
  let material = cfg.silencerMaterial;
  if (material == "1") {
    material = "Aluminized";
  }
  if (material == "2") {
    material = "Carbon Steel";
  }
  if (material == "3") {
    material = "304 Stainless";
  }
  if (material == "4") {
    material = "316 Stainless";
  }
  if (material == "5") {
    material = "321 Stainless";
  }
  if (material == "6") {
    material = "409 Stainless";
  }

  kBObj.kBMaterialConstruction = material;

  // MOUNT TYPE / ORIENTATION
  let mountType = cfg.silencerMountType;
  let mountType_MD = cfg.silencerMountType_MD;
  let orientation = "Horizontal";

  // MOUNT TYPE IF CYLINDRICAL

  if (cfg.silencerFormFactor == "Cylindrical") {
    if (mountType == "A") {
      orientation = "Vertical";
    }
    if (mountType == "B") {
      orientation = "Vertical";
    }
    if (mountType == "V") {
      orientation = "Vertical";
    }
    if (mountType == "D") {
      orientation = "Vertical";
    }

    /*  
        if (mountType == "A") { mountType = "(3) Vertical Mounting Legs"; orientation = "Vertical"; }
        if (mountType == "B") { mountType = "(4) Vertical Mounting Legs"; orientation = "Vertical"; }
        if (mountType == "C") { mountType = "Base Mounted"; }
        if (mountType == "E") { mountType = "Horizontal Shell Supports"; }
        if (mountType == "0") { mountType = "No Mounts"; }
        if (mountType == "F") { mountType = "Saddle Supports"; }
        if (mountType == "T") { mountType = "Trunnion"; }
        if (mountType == "V") { mountType = "Vertical Orientation - No Supports"; orientation = "Vertical"; }
        if (mountType == "D") { mountType = "Vertical Shell Supports"; orientation = "Vertical"; }
    */
  }

  // MOUNT TYPE IF OVAL
  if (cfg.silencerFormFactor == "Oval") {
    if (mountType_MD == "B") {
      mountType = "H";
    }
    if (mountType_MD == "T") {
      mountType = "G";
    }
    if (mountType_MD == "D") {
      mountType = "I";
    }
    if (mountType_MD == "0") {
      mountType = "";
    }
  }

  // MOUNT TYPE IF DISK SILENCER
  if (cfg.silencerFormFactor == "Disk") {
    if (mountType_MD == "B") {
      mountType = "B";
    } // Bottom Lugs
    if (mountType_MD == "D") {
      mountType = "D";
    } // Dual Lugs
    if (mountType_MD == "0") {
      mountType = "";
    } // No Lugs
    if (mountType_MD == "T") {
      mountType = "T";
    } // Top Lugs

    /*
        if (mountType_MD == "B") { mountType = "Bottom Lugs"; } // Bottom Lugs
        if (mountType_MD == "D") { mountType = "Dual Lugs"; } // Dual Lugs
        if (mountType_MD == "0") { mountType = "No Lugs"; } // No Lugs
        if (mountType_MD == "T") { mountType = "Top Lugs"; } // Top Lugs
        */
  }
  //if (mountType_MD !== "") { mountType = mountType_MD; orientation = "Horizontal"; }

  kBObj.kBMountType = mountType;
  kBObj.kBOrientation = orientation;

  // Spark Arresting
  if (cfg.silencerType === "Spark Arresting") {
    kBObj.kBSparkBox = true;
  }

  // PRODUCT DESCRIPTION
  let type = cfg.silencerType;
  if (type == "Standard") {
    type = "";
  }

  // DRAWING DESCRIPTION HARDCODED BLANK PER CODY
  // kBObj.kBDrawingDescription = modelSize + " " + cfg.silencerFormFactor + " " + type + " " + cfg.silencerGradeTXT + " Silencer";

  /*
   * PHYSICAL PROPERTY LOOKUP
   * Dependency: Series, Grade, Orientation, Outlet Size
   */

  // Physical Properties Lookup
  let pProperties = lookup(
    "SELECT dia, height, width, bodyLength, inletStickOut, outletStickOut, inletLength, outletLength, OAL, weight FROM physicalProperties where series = :series and grade = :grade and orientationSimple = :orientation and outletSize = :outletSize",
    {
      series: cfg.silencerSeries,
      grade: cfg.silencerGrade,
      orientation: cfg.silencerOrientationName,
      outletSize: kBObj.kBOutletSize,
    }
  );

  // Physical Properties Error Handling
  let pPropLookupComplete = false;

  // ADO-11118, set condition to > 0 from == 1
  if (Array.isArray(pProperties) && pProperties.length > 0) {
    console.log(
      "LN 222: pProperties is an array with at least one row, proceeding with calculation."
    );
    pPropLookupComplete = true;
    pProperties = pProperties[0];
  } else {
    console.log(
      "LN 226: pProperties does not contain Physical Properties for this configuration"
    );
  }

  console.log(pProperties);

  if (pPropLookupComplete == true) {
    kBObj.kBDiameter = pProperties.dia;
    kBObj.kBHeight = pProperties.height;
    kBObj.kBLength = pProperties.bodyLength;
    kBObj.kBWeight = pProperties.weight;
    kBObj.kBOAL = pProperties.OAL;
    kBObj.kBWidth = pProperties.width;
  }

  /*
   *
   * OVAL SILENCER HARD CODE DIAMETER
   * NEED TO VALIDATE WITH MIRATECH - ADO-10227
   *
   */

  // if (kBObj.kBFormFactor == "Oval"){ kBObj.kBDiameter = kBObj.kBOAL - kBObj.kBWidth }
  if (kBObj.kBFormFactor == "Oval") {
    kBObj.kBDiameter = kBObj.kBHeight;
  }

  /*
   * INLET & OUTLET TRANSLATION
   */

  // INLET SIZE
  let inletSize = cfg.silencerInletSize;
  if (inletSize == "match") {
    inletSize = kBObj.kBOutletSize;
  }

  // INLET & OUTLET ORIENTATION
  const orientationName = cfg.silencerOrientationName;
  let inletSimple = "";
  let outletSimple = "";

  // RETURN T,B,E,S for EACH
  if (orientationName == "B-S") {
    inletSimple = "B";
    outletSimple = "S";
  }
  if (orientationName == "B-T") {
    inletSimple = "B";
    outletSimple = "T";
  }
  if (orientationName == "B-E") {
    inletSimple = "B";
    outletSimple = "E";
  }
  if (orientationName == "E-E") {
    inletSimple = "E";
    outletSimple = "E";
  }
  if (orientationName == "E-P") {
    inletSimple = "E";
    outletSimple = "P";
  }
  if (orientationName == "E-S") {
    inletSimple = "E";
    outletSimple = "S";
  }
  if (orientationName == "E-T") {
    inletSimple = "E";
    outletSimple = "T";
  }
  if (orientationName == "S-E") {
    inletSimple = "S";
    outletSimple = "E";
  }
  if (orientationName == "S-S") {
    inletSimple = "S";
    outletSimple = "S";
  }

  // ********** CODY TEST **********
  // INLET SIMPLE OVERRIDE FOR DUAL INLETS ON CYLINDRICAL ONLY
  if (
    cfg.silencerFormFactor == "Cylindrical" &&
    cfg.silencerInletQty != "S" &&
    inletSimple == "S" &&
    cfg.silencerInletOrientation == "A"
  ) {
    inletSimple = "T";
  }
  if (
    cfg.silencerFormFactor == "Cylindrical" &&
    cfg.silencerInletQty != "S" &&
    inletSimple == "S" &&
    cfg.silencerInletOrientation == "G"
  ) {
    inletSimple = "B";
  }
  // OUTLET SIMPLE OVERRIDE FOR DUAL INLETS
  if (
    cfg.silencerFormFactor == "Cylindrical" &&
    cfg.silencerInletQty != "S" &&
    outletSimple == "S" &&
    cfg.silencerOutletOrientation == "A"
  ) {
    outletSimple = "T";
  }
  if (
    cfg.silencerFormFactor == "Cylindrical" &&
    cfg.silencerInletQty != "S" &&
    outletSimple == "S" &&
    cfg.silencerOutletOrientation == "G"
  ) {
    outletSimple = "B";
  }
  // ********** END TEST **********

  // DISK ORIENTATATIN HARD CODED ORIENTATATION MAPPING
  // DISK AVAIL CONFIGS **ONLY B-S, B-T**
  // Per Cody, this was done while testing KB
  if (cfg.silencerFormFactor == "Disk") {
    if (orientationName == "B-S") {
      inletSimple = "B";
      outletSimple = "E";
    }
  }

  /*
   * INLET[0]
   */

  let inletOrientation = cfg.silencerInletOrientation;

  kBObj.kBInlet0Size = inletSize; // DONE
  kBObj.kBInlet0Connection = cfg.silencerInletConnection; // DONE
  kBObj.kBInlet0FaceOffset = 0;
  kBObj.kBInlet0Location = inletSimple; // DONE
  kBObj.kBInlet0Orientation = inletOrientation; // DONE
  kBObj.kBInlet0XOffset = cfg.eightXInlet; // DONE
  kBObj.kBInlet0YOffset = cfg.eightYInlet; // DONE
  kBObj.kBInletQty = cfg.silencerInletQty;

  if (kBObj.kBInletQty == "S") {
    kBObj.kBInletQtyInt = 1;
  } else if (kBObj.kBInletQty == "D") {
    kBObj.kBInletQtyInt = 2;
    kBObj.kBInlet1Size = kBObj.kBInlet0Size;
    kBObj.kBInlet1Connection = kBObj.kBInlet0Connection;
    kBObj.kBInlet1Orientation = kBObj.kBInlet0Orientation;
    kBObj.kBInlet1Location = kBObj.kBInlet0Location;
  }

  /* INLET[0] COPIED FROM OUTLET - CYL & OVAL
   *
   * Updated all inlet/outlet calculations 7/9/24 based on Cody/UAT feedback
   *
   */

  if (cfg.silencerFormFactor == "Cylindrical") {
    // CYLINDRICAL NOT END INLET[0]
    if (inletSimple !== "E") {
      kBObj.kBInlet0DistanceEnd = cfg.eightFInlet;

      if (kBObj.kBInlet0Size > 13) {
        kBObj.kBInlet0DistanceCenterline = kBObj.kBDiameter * 0.5 + 5;
      } else {
        kBObj.kBInlet0DistanceCenterline = kBObj.kBDiameter * 0.5 + 4;
      }
    }

    // CYLINDRICAL SIDE INLET[0]
    if (inletSimple === "S") {
      console.log("C Side - Skipped");
    }
    // CYLINDRICAL END INLET[0]
    if (inletSimple == "E") {
      if (kBObj.kBInlet0Size > 13) {
        // DIFFERS FROM OVALS
        kBObj.kBInlet0DistanceEnd = 5; // DIFFERS FROM OVALS
        kBObj.kBInlet0DistanceCenterline = 5; // DIFFERS FROM OVALS
      } else {
        kBObj.kBInlet0DistanceEnd = 4; // DIFFERS FROM OVALS
        kBObj.kBInlet0DistanceCenterline = 4; // DIFFERS FROM OVALS
      }
    }
    // TOP/BOTTOM IN X SPREAD FOR INLET[0]
    if (kBObj.kBInletQtyInt > 1 && cfg.eightXInlet > 0) {
      kBObj.kBInlet0DistanceCenterlinePlane = -0.5 * cfg.eightXInlet;
    } else {
      kBObj.kBInlet0DistanceCenterlinePlane = 0;
    }
    // TOP/BOTTOM IN Y SPREAD FOR INLET[0]
    if (
      kBObj.kBInletQtyInt > 1 &&
      cfg.eightYInlet > 0 &&
      cfg.eightDualInletLayout == "left"
    ) {
      kBObj.kBInlet0DistanceEnd = cfg.eightFInlet;
    } else if (
      kBObj.kBInletQtyInt > 1 &&
      cfg.eightYInlet > 0 &&
      cfg.eightDualInletLayout == "right"
    ) {
      kBObj.kBInlet0DistanceEnd = cfg.eightFInlet + cfg.eightYInlet;
    }
  } else if (cfg.silencerFormFactor == "Oval") {
    // OVAL NOT END INLET[0]
    if (inletSimple !== "E") {
      kBObj.kBInlet0DistanceEnd = cfg.eightFInlet;
      kBObj.kBInlet0DistanceCenterline = kBObj.kBDiameter * 0.5 + 4;
      kBObj.kBInlet0DistanceCenterlinePlane = cfg.eightInletCenterline;
    }
    // OVAL SIDE INLET[0]
    if (inletSimple === "S") {
      console.log("O Side - Skipped");
    }
    // OVAL END INLET[0]
    if (inletSimple == "E") {
      if (kBObj.kBInlet0Size > 4) {
        // DIFFERS FROM CYLINDRICALS
        kBObj.kBInlet0DistanceEnd = 4; // DIFFERS FROM CYLINDRICALS
        kBObj.kBInlet0DistanceCenterline = 4; // DIFFERS FROM CYLINDRICALS
      } else {
        kBObj.kBInlet0DistanceEnd = 3; // DIFFERS FROM CYLINDRICALS
        kBObj.kBInlet0DistanceCenterline = 3; // DIFFERS FROM CYLINDRICALS
      }
    }
    // TOP/BOTTOM IN X VALUE FOR INLET[0]
    if (cfg.eightXInlet != 0) {
      if (cfg.eightDualInletLayout == "left") {
        kBObj.kBInlet0DistanceCenterlinePlane = cfg.eightXInlet * -1;
      } else if (cfg.eightDualInletLayout == "right") {
        kBObj.kBInlet0DistanceCenterlinePlane =
          cfg.eightXInlet - cfg.eightInletCenterline;
      }
    }

    /* // TOP/BOTTOM IN X SPREAD FOR INLET[0]
        if (kBObj.kBInletQtyInt > 1 && cfg.eightXInlet > 0) {
            kBObj.kBInlet0DistanceCenterlinePlane = (-0.5 * cfg.eightXInlet);
        } else {
            kBObj.kBInlet0DistanceCenterlinePlane = 0;
        }*/
    // TOP/BOTTOM IN Y SPREAD FOR INLET[0]
    if (
      kBObj.kBInletQtyInt > 1 &&
      cfg.eightYInlet > 0 &&
      cfg.eightDualInletLayout == "left"
    ) {
      kBObj.kBInlet0DistanceEnd = cfg.eightFInlet;
    } else if (
      kBObj.kBInletQtyInt > 1 &&
      cfg.eightYInlet > 0 &&
      cfg.eightDualInletLayout == "right"
    ) {
      kBObj.kBInlet0DistanceEnd = cfg.eightFInlet + cfg.eightYInlet;
    }
  } else {
    // BOTTOM INLET[0]
    if (inletSimple == "B") {
      //  Not sure this is correct on row 7 of Mtech Dim Calcs / LogiktokbridgeParameters.xlsx
      //kBObj.kBInlet0DistanceEnd = cfg.eightFInlet;
      if (kBObj.kBInlet0Size > 4) {
        kBObj.kBInlet0DistanceEnd = 4;
        kBObj.kBInlet0FaceOffset = 4;
      } else {
        kBObj.kBInlet0DistanceEnd = 3;
        kBObj.kBInlet0FaceOffset = 3;
      }
      if (kBObj.kBInletQtyInt > 1) {
        if (cfg.eightDualInletLayout == "left") {
          kBObj.kBInlet0XOffset = cfg.eightXInlet * -1;
          kBObj.kBInlet0YOffset = cfg.eightFInlet * -1;
          /*
                    kBObj.kBInlet0XOffset = cfg.eightXInlet * -0.5;
                    kBObj.kBInlet0YOffset = cfg.eightYInlet * -0.5;
                    */
        }
        if (cfg.eightDualInletLayout == "right") {
          kBObj.kBInlet0XOffset = cfg.eightXInlet - cfg.eightInletCenterline;
          kBObj.kBInlet0YOffset = cfg.eightFInlet * -1 + cfg.eightYInlet;
          /*
                    kBObj.kBInlet0XOffset = cfg.eightXInlet * -0.5;
                    kBObj.kBInlet0YOffset = cfg.eightYInlet * -0.5;
                    */
        }
      } else {
        kBObj.kBInlet0XOffset = cfg.eightXInlet;
        kBObj.kBInlet0YOffset = cfg.eightYInlet;
      }
    }
  }

  /*
   * INLET[1]
   */

  if (cfg.silencerFormFactor == "Cylindrical") {
    // CYLINDRICAL NOT END INLET[1]
    if (inletSimple !== "E") {
      kBObj.kBInlet1DistanceEnd = cfg.eightFInlet;

      if (kBObj.kBInlet1Size > 13) {
        kBObj.kBInlet1DistanceCenterline = kBObj.kBDiameter * 0.5 + 5;
      } else {
        kBObj.kBInlet1DistanceCenterline = kBObj.kBDiameter * 0.5 + 4;
      }
    }

    // CYLINDRICAL SIDE INLET[1]
    if (inletSimple === "S") {
      console.log("C Side - Skipped");
    }
    // CYLINDRICAL END INLET[1]
    if (inletSimple == "E") {
      if (kBObj.kBInlet1Size > 13) {
        // DIFFERS FROM OVALS
        kBObj.kBInlet1DistanceEnd = 5; // DIFFERS FROM OVALS
        kBObj.kBInlet1DistanceCenterline = 5; // DIFFERS FROM OVALS
      } else {
        kBObj.kBInlet1DistanceEnd = 4; // DIFFERS FROM OVALS
        kBObj.kBInlet1DistanceCenterline = 4; // DIFFERS FROM OVALS
      }
    }
    // TOP/BOTTOM IN X SPREAD FOR INLET[1]
    if (kBObj.kBInletQtyInt > 1 && cfg.eightXInlet > 0) {
      kBObj.kBInlet1DistanceCenterlinePlane = 0.5 * cfg.eightXInlet;
    } else {
      kBObj.kBInlet1DistanceCenterlinePlane = 0;
    }
    // TOP/BOTTOM IN Y SPREAD FOR INLET[1]
    if (
      kBObj.kBInletQtyInt > 1 &&
      cfg.eightYInlet > 0 &&
      cfg.eightDualInletLayout == "right"
    ) {
      kBObj.kBInlet1DistanceEnd = cfg.eightFInlet;
    } else if (
      kBObj.kBInletQtyInt > 1 &&
      cfg.eightYInlet > 0 &&
      cfg.eightDualInletLayout == "left"
    ) {
      kBObj.kBInlet1DistanceEnd = cfg.eightFInlet + cfg.eightYInlet;
    }
  } else if (cfg.silencerFormFactor == "Oval") {
    // OVAL NOT END INLET[1]
    if (inletSimple !== "E") {
      kBObj.kBInlet1DistanceEnd = cfg.eightFInlet;
      kBObj.kBInlet1DistanceCenterline = kBObj.kBDiameter * 0.5 + 4;
      kBObj.kBInlet1DistanceCenterlinePlane = cfg.eightInletCenterline;
    }
    // OVAL SIDE INLET[1]
    if (inletSimple === "S") {
      console.log("O Side - Skipped");
    }
    // OVAL END INLET[1]
    if (inletSimple == "E") {
      if (kBObj.kBInlet1Size > 4) {
        // DIFFERS FROM CYLINDRICALS
        kBObj.kBInlet1DistanceEnd = 4; // DIFFERS FROM CYLINDRICALS
        kBObj.kBInlet1DistanceCenterline = 4; // DIFFERS FROM CYLINDRICALS
      } else {
        kBObj.kBInlet1DistanceEnd = 3; // DIFFERS FROM CYLINDRICALS
        kBObj.kBInlet1DistanceCenterline = 3; // DIFFERS FROM CYLINDRICALS
      }
    }
    // TOP/BOTTOM IN X VALUE FOR INLET[1]
    if (cfg.eightXInlet != 0) {
      if (cfg.eightDualInletLayout == "right") {
        kBObj.kBInlet1DistanceCenterlinePlane = cfg.eightXInlet;
      } else if (cfg.eightDualInletLayout == "left") {
        kBObj.kBInlet1DistanceCenterlinePlane =
          cfg.eightXInlet * -1 + cfg.eightInletCenterline;
      }
    }
    /*
        // TOP/BOTTOM IN X SPREAD FOR INLET[1]
        if (kBObj.kBInletQtyInt > 1 && cfg.eightXInlet > 0) {
            kBObj.kBInlet1DistanceCenterlinePlane = (0.5 * cfg.eightXInlet);
        } else {
            kBObj.kBInlet1DistanceCenterlinePlane = 0;
        }*/
    // TOP/BOTTOM IN Y SPREAD FOR INLET[1]
    if (
      kBObj.kBInletQtyInt > 1 &&
      cfg.eightYInlet > 0 &&
      cfg.eightDualInletLayout == "right"
    ) {
      kBObj.kBInlet1DistanceEnd = cfg.eightFInlet;
    } else if (
      kBObj.kBInletQtyInt > 1 &&
      cfg.eightYInlet > 0 &&
      cfg.eightDualInletLayout == "left"
    ) {
      kBObj.kBInlet1DistanceEnd = cfg.eightFInlet + cfg.eightYInlet;
    }
  } else {
    // BOTTOM INLET[1]
    if (inletSimple == "B") {
      //  Not sure this is correct on row 7 of Mtech Dim Calcs / LogiktokbridgeParameters.xlsx
      //kBObj.kBInlet1DistanceEnd = cfg.eightFInlet;
      if (kBObj.kBInlet1Size > 4) {
        kBObj.kBInlet1DistanceEnd = 4;
        kBObj.kBInlet1FaceOffset = 4;
      } else {
        kBObj.kBInlet1DistanceEnd = 3;
        kBObj.kBInlet1FaceOffset = 3;
      }
      if (kBObj.kBInletQtyInt > 1) {
        if (cfg.eightDualInletLayout == "right") {
          kBObj.kBInlet1XOffset = cfg.eightXInlet;
          kBObj.kBInlet1YOffset = cfg.eightFInlet;
          /*
                    kBObj.kBInlet1XOffset = cfg.eightXInlet * -0.5;
                    kBObj.kBInlet1YOffset = cfg.eightYInlet * -0.5;
                    */
        }
        if (cfg.eightDualInletLayout == "left") {
          kBObj.kBInlet1XOffset =
            cfg.eightXInlet * -1 + cfg.eightInletCenterline;
          kBObj.kBInlet1YOffset = cfg.eightFInlet * -1 + cfg.eightYInlet;
          /*
                    kBObj.kBInlet1XOffset = cfg.eightXInlet * -0.5;
                    kBObj.kBInlet1YOffset = cfg.eightYInlet * -0.5;
                    */
        }
      } else {
        kBObj.kBInlet1XOffset = cfg.eightXInlet;
        kBObj.kBInlet1YOffset = cfg.eightYInlet;
      }
    }

    // INLET[1] ORIENTATION
    // if (inletOrientation == "C") { kBObj.kBInlet1Orientation = "C"; }
    // if (inletOrientation == "D") { kBObj.kBInlet1Orientation = "D"; }
    // if (inletOrientation == "F") { kBObj.kBInlet1Orientation = "F"; }
    // if (inletOrientation == "G") { kBObj.kBInlet1Orientation = "G"; }
    // if (inletOrientation == "H") { kBObj.kBInlet1Orientation = "H"; }
    // if (inletOrientation == "I") { kBObj.kBInlet1Orientation = "I"; }
    // if (inletOrientation == "J") { kBObj.kBInlet1Orientation = "J"; }
    // if (inletOrientation == "A") { kBObj.kBInlet1Orientation = "A"; }
    // if (inletOrientation == "B") { kBObj.kBInlet1Orientation = "B"; }
    // if (inletOrientation == "E") { kBObj.kBInlet1Orientation = "E"; }
  }

  /*
   ************************** OUTLET[0] *******************************
   */

  kBObj.kBOutletConnection = cfg.silencerOutletConnection; // DONE
  kBObj.kBOutletLocation = outletSimple; // DONE
  kBObj.kBOutletOrientation = cfg.silencerOutletOrientation; // DONE

  /*
   * OUTLET[0]
   */

  if (cfg.silencerFormFactor == "Cylindrical") {
    // CYLINDRICAL NOT END OUTLET[0]
    if (outletSimple !== "E") {
      kBObj.kBOutletDistanceEnd = cfg.eightFOutlet;

      if (kBObj.kBOutletSize > 13) {
        kBObj.kBOutletDistanceCenterline = kBObj.kBDiameter * 0.5 + 5;
      } else {
        kBObj.kBOutletDistanceCenterline = kBObj.kBDiameter * 0.5 + 4;
      }
    }

    // CYLINDRICAL SIDE OUTLET[0]
    if (outletSimple === "S") {
      console.log("C Side - Skipped");
    }
    // CYLINDRICAL END OUTLET[0]
    if (outletSimple == "E") {
      if (kBObj.kBOutletSize > 13) {
        // DIFFERS FROM OVALS
        kBObj.kBOutletDistanceEnd = 5; // DIFFERS FROM OVALS
        kBObj.kBOutletDistanceCenterline = 5; // DIFFERS FROM OVALS
      } else {
        kBObj.kBOutletDistanceEnd = 4; // DIFFERS FROM OVALS
        kBObj.kBOutletDistanceCenterline = 4; // DIFFERS FROM OVALS
      }
    }
  } else if (cfg.silencerFormFactor == "Oval") {
    // OVAL NOT END OUTLET[0]
    if (outletSimple !== "E") {
      kBObj.kBOutletDistanceEnd = cfg.eightFOutlet;
      kBObj.kBOutletDistanceCenterline = kBObj.kBDiameter * 0.5 + 4;
      kBObj.kBOutletDistanceCenterlinePlane = cfg.eightOutletCenterline;
    }
    // OVAL SIDE OUTLET[0]
    if (outletSimple === "S") {
      console.log("O Side - Skipped");
    }
    // OVAL END OUTLET[0]
    if (outletSimple == "E") {
      if (kBObj.kBOutletSize > 4) {
        // DIFFERS FROM CYLINDRICALS
        kBObj.kBOutletDistanceEnd = 4; // DIFFERS FROM CYLINDRICALS
        kBObj.kBOutletDistanceCenterline = 4; // DIFFERS FROM CYLINDRICALS
      } else {
        kBObj.kBOutletDistanceEnd = 3; // DIFFERS FROM CYLINDRICALS
        kBObj.kBOutletDistanceCenterline = 3; // DIFFERS FROM CYLINDRICALS
      }
    }

    // OUTLET[0]: ****DISK****
    // DISK AVAIL CONFIGS **ONLY B-S, B-T**
  } else {
    // END OUTLET[0]
    if (outletSimple === "S") {
      kBObj.kBOutletDistanceCenterlinePlane = kBObj.kBDiameter * 0.5 + 4;
      if (model == "MD5") {
        kBObj.kBOutletDistanceCenterlinePlane = kBObj.kBHeight * 0.5 + 3;
      }
    }
    // END OUTLET[0]
    if (outletSimple == "E") {
      if (kBObj.kBOutletSize > 4) {
        kBObj.kBOutletDistanceEnd = 4;
        kBObj.kBOutletFaceOffset = 4;
      } else {
        kBObj.kBOutletDistanceEnd = 3;
        kBObj.kBOutletFaceOffset = 3;
      }
    }
    // TOP OUTLET[0]
    if (outletSimple == "T") {
      if (kBObj.kBOutletSize > 4) {
        kBObj.kBOutletYOffset = cfg.eightFOutlet;
        kBObj.kBOutletFaceOffset = 4;
      } else {
        kBObj.kBOutletYOffset = cfg.eightFOutlet;
        kBObj.kBOutletFaceOffset = 3;
      }
    }
  }

  /*
   ************************** OUTLET END *******************************
   */

  /*
   * DRAIN PORT
   * Dependency: Physical Properties
   */

  // DRAIN PORT OFFSET (CYL)
  if (cfg.silencerFormFactor == "Cylindrical") {
    kBObj.kBDrainPortOffset = 0;
  }

  // DRAIN PORT OFFSET (OVAL)
  if (cfg.silencerFormFactor == "Oval") {
    if (inletSimple == "B") {
      kBObj.kBDrainPortOffset =
        kBObj.kBInlet0Size * 0.5 + kBObj.kBInlet0DistanceEnd + 4;
    } else {
      kBObj.kBDrainPortOffset = 3;
    }
  }

  // DRAIN PORT OFFSET (DISK)
  if (cfg.silencerFormFactor == "Disk") {
    kBObj.kBDrainPortOffset = kBObj.kBDiameter / 2 - 3;
  }

  // DRAIN PORT SIZE
  if (cfg.silencerFormFactor == "Cylindrical" && kBObj.kBOutletSize < 4) {
    kBObj.kBDrainPortSize = 0.25;
  } else {
    kBObj.kBDrainPortSize = 0.5;
  }

  /*
   * LIFTING LUGS
   * Dependency: Physical Properties
   */

  // LIFTING LUG BOOLEAN, SIZE, QTY, THICKNESS
  if (cfg.silencerFormFactor == "Cylindrical" && kBObj.kBDiameter >= 30) {
    // BOOLEAN
    kBObj.kBLiftingLug = true;

    // QTY
    kBObj.kBLiftingLugQty = 2;

    // SIZE
    if (kBObj.kBDiameter >= 48) {
      kBObj.kBLiftingLugSize = 1;
    } else {
      kBObj.kBLiftingLugSize = 0.5;
    }

    // THICKNESS
    if (kBObj.kBDiameter <= 26) {
      kBObj.kBLiftingLugThickness = 0.25;
    } else if (kBObj.kBDiameter <= 60) {
      kBObj.kBLiftingLugThickness = 0.5;
    } else {
      kBObj.kBLiftingLugThickness = 1;
    }
  }

  /*
   * SUPPORTS
   * Dependency: Physical Properties
   */

  // Distance Between
  if (cfg.silencerFormFactor !== "Disk") {
    kBObj.kBSupportDistanceBetween = kBObj.kBLength * 0.5;
  }

  // Distance Centerline
  if (cfg.silencerFormFactor !== "Disk") {
    kBObj.kBSupportDistanceCenterline = kBObj.kBDiameter * 0.5 + 3;
  }

  // Distance End
  if (cfg.silencerFormFactor == "Cylindrical") {
    kBObj.kBSupportDistanceEnd = kBObj.kBOAL / 4;
  }
  if (cfg.silencerFormFactor == "Oval") {
    kBObj.kBSupportDistanceEnd = kBObj.kBLength * 0.25;
  }

  //Hole Size
  if (cfg.silencerFormFactor == "Cylindrical") {
    if (kBObj.kBDiameter <= 36) {
      kBObj.kBSupportHoleSize = 0.875;
    } else {
      kBObj.kBSupportHoleSize = 1.125;
    }
  } else {
    kBObj.kBSupportHoleSize = 0.875;
  }

  //Hole Widths
  if (cfg.silencerFormFactor !== "Disk") {
    kBObj.kBSupportHoleWidths = kBObj.kBLength * 0.5;
  } else {
    kBObj.kBSupportHoleWidths = kBObj.kBDiameter * 0.25;
  }
}

console.log(kBObj);

/*
let debuggerscript =
{
    "cfg": {
        "quoteNumber": "Q-555555",
        "opportunityName_Logik": "Project Name Debug",
        "eightFInlet": 0,
        "eightFOutlet": 0,
        "eightXInlet": 0,
        "eightYInlet": 0,
        "silencerFormFactor": "Cylindrical",
        "silencerGrade": "5",
        "silencerGradeTXT": "GRADE TXT INDUSTRIAL",
        "silencerInletConnection": "PF",
        "silencerInletOrientation": "F",
        "silencerInletQty": "S",
        "silencerInletSize": "match",
        "silencerInputSizeInformationComplete": true,
        "silencerMaterial": 3,
        "silencerMountType": "F",
        "silencerMountType_MD": "",
        "silencerOrientationName": "E-E",
        "silencerOutletConnection": "PF",
        "silencerOutletOrientation": "F",
        "silencerPartNumber": "NNNNNN-XXXXX-YYYYYY-12345678",
        "silencerSeries": "M",
        "silencerType": "Standard"
    },
    "set": {
        "resultStandardSet": {
            "selectedSize": 16
        }
    }
}
;*/

return kBObj;
