$logikInputs = @"
let ProductType = cfg.standardSelectionProductType;
let Grade = cfg.standardSelectionGrade;
let Series = cfg.standardSelectionSilencerSeries;
let Material = cfg.standardSelectionMaterial;
let Geometry = cfg.standardSelectionGeometry;
let Performance = cfg.standardSelectionApexPerformance;
let Application = cfg.standardSelectionApexApplication;
let InletSize = cfg.standardSelectionInletSize;
let OutletSize = cfg.standardSelectionOutletSize;
let ProductSubcategory = cfg.standardSelectionProductCategory;
let InletQty = cfg.standardSelectionInletQuantity;
let Orientation = cfg.standardSelectionp4silencerOrientationName;
let OutletOrientation = cfg.standardSelectionp4OutletOrientation;
let InletOrientation = cfg.standardSelectionProduct40SilencerConfigurationInletOrientation;
let CylType = cfg.standardSelectionCylindricalType;
let AccessoryType = cfg.standardSelectionAccessoryType;
let InletConnection = cfg.standardSelectionInletConnection;
let InletFlangeType = cfg.standardSelectionInletFlangeMountType;
let OutletConnection = cfg.standardSelectionOutletConnection;
let OutletFlangeType = cfg.standardSelectionOutletFlangeMountType;
let Insulation = cfg.standardSelectionInsulation;
let MountType = cfg.standardSelectionMountType;
let ApexDiameter = cfg.standardSelectionRoundAPXDia;
let ApexLength = cfg.standardSelectionSquareAPXLength;
let ApexWidth = cfg.standardSelectionSquareAPXWidth;
let ApexDimTog = cfg.standardSelectionAPEXDimensionsToggle;
let LengthDependentCosting = cfg.standardSelectionLengthDependentCosting;

let PipeOrTube = cfg.standardSelectionPipeOrTube;
let OverallLength = cfg.standardSelectionOverallLength;
let NominalDiameter = cfg.standardSelectionNominalDiameter;
let Style = cfg.standardSelectionP4Style;
let WyeLayout = cfg.standardSelectionProduct40AccWyeLayout;

let InletSpacing = cfg.standardSelectionP4OffsetX;
let FlangeType = cfg.standardSelectionP4FlangeType;
let FlangeGroup = cfg.standardSelectionP4FlangeGroup;
let FlangePrefix = cfg.standardSelectionP4AccFlangePrefix;
let ElbowType = cfg.standardSelectionP4ElbowType;
let ElbowInput = cfg.standardSelectionP4FlexElbowInput;
let FlexSize = cfg.standardSelectionP4FlexSizeInput;
let InletCenterlineToOutletFace = cfg.standardSelectionP4InletCenterlineToOutletFace;
let InletFaceToOutletCenterline = cfg.standardSelectionP4InletFaceToOutletCenterline;
let LegLength1 = cfg.standardSelectionLegLengthInlet;
let LegLength2 = cfg.standardSelectionLegLengthOutlet;
let LengthOffset = cfg.standardSelectionP4OffsetZ;
let OuterDiameter1 = cfg.standardSelectionOuterDiameter1;
let OuterDiameter2 = cfg.standardSelectionP4OuterDiameter2;
let OuterDiameter3 = cfg.standardSelectionP4OuterDiameter3;
let AccWidth = cfg.standardSelectionP4Width;
let AccWeight = cfg.standardSelectionP4Weight;
//let AccHeight = cfg.standardSelectionP4Height;
let AccMaxSize = cfg.standardSelectionP4MaxSize;
let AccMinSize = cfg.standardSelectionP4MinSize;
let BoltCircleDia = cfg.standardSelectionP4BoltCircleDiameter;
//let BoltHoleDia = cfg.
let BoltSize = cfg.standardSelectionP4BoltSize;
let BoltSpacing = cfg.standardSelectionP4BoltSpacing;
let Flare = cfg.standardSelectionP4Flare;
let InnerDiameter = cfg.standardSelectionP4InnerDiameter;
let BoltHoleQty = cfg.standardSelectionP4BoltHoleQty;
let WallThickness = cfg.standardSelectionP4WallThickness;
let Thickness1 = cfg.standardSelectionP4Thickness1;
let Thickness2 = cfg.standardSelectionP4Thickness2;

let PartNumberSearch = cfg.standardSelectionPartNumberSearch;
"@

$cfg = @{}

foreach ($line in $logikInputs -split "`n") {
    if ($line -match 'cfg\.(\w+);') {
        $key = $matches[1]
        $cfg[$key] = ""
    }
}

$json = @{ "cfg" = $cfg } | ConvertTo-Json -Depth 10

$json | Set-Clipboard

Write-Output $json
Write-Output "JSON also copied to clipboard:"
