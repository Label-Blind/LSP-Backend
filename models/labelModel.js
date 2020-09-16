var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;
var Faq = new Schema({
    business_type: {
        type: String,
        default: null
    },
    package_type: {
        type: String,
        default: null
    },
    package_height: {
        type: String,
        default: null
    },
    package_width: {
        type: String,
        default: null
    },
    label_part: {
        type: String,
        default: null
    },
    label_shape: {
        type: String,
        default: null
    },
    label_height: {
        type: String,
        default: null
    },
    label_width: {
        type: String,
        default: null
    },
    diameter: {
        type: String,
        default: null
    },
    // 2nd step
    category_code: {
        type: String,
        default: null
    },
    sub_category_code: {
        type: String,
        default: null
    },
    sub_sub_category_code: {
        type: String,
        default: null
    },
    sub_sub_sub_category_code: {
        type: String,
        default: null
    },
    // 3rd step
    food_name: {
        type: String,
        default: null
    },
    logo: {
        type: String,
        default: null
    },
    // allergens information
    allergens_dropdown_1: {
        type: String,
        default: null
    },
    allergens_dropdown_2: {
        type: String,
        default: null
    },
    allergens_dropdown_3: {
        type: String,
        default: null
    },
    // Nutrition informations
    serving_size: {
        type: String,
        default: null
    },
    lab_report: {
        type: String,
        default: null
    },
    mendatory_nutrient: {
        type: Array,
        default: null
    },
    non_mendatory_nutrient: {
        type: Array,
        default: null
    },
    non_mendatory_nutrient_extra: {
        type: Array,
        default: null
    },
    lab_report: {
        type: String,
        default: null
    },
    table_type: {
        type: String,
        default: null
    },
    // Declaration_of_veg/non veg
    declaration_of_veg: {
        type: String,
        default: null
    },
    // Mendatory Declaration
    // part 1
    package_of_food_containing: {
        type: Array,
        default: null
    },
    // part 2
    maida_treated: {
        type: Boolean,
        default: false
    },
    dried_glucose: {
        type: Boolean,
        default: false
    },
    fruit_squash: {
        type: Boolean,
        default: false
    },
    bakery_and_industrial: {
        type: Boolean,
        default: false
    },
    flavour_emulsion: {
        type: Boolean,
        default: false
    },
    cheese: {
        type: Boolean,
        default: false
    },
    frozen_dessert: {
        type: Boolean,
        default: false
    },
    edible_vegetable_oil: {
        type: Boolean,
        default: false
    },
    vegetable_fat: {
        type: Boolean,
        default: false
    },
    common_salt: {
        type: Boolean,
        default: false
    },
    iodisation: {
        type: Boolean,
        default: false
    },
    iron_fortification: {
        type: Boolean,
        default: false
    },
    animal_use: {
        type: Boolean,
        default: false
    },
    medicine: {
        type: Boolean,
        default: false
    },
    industrial_use: {
        type: Boolean,
        default: false
    },
    gelatin_meant: {
        type: Boolean,
        default: false
    },
    wax_name: {
        type: String,
        default: null
    },
    // part 3
    pan_masala: {
        type: Boolean,
        default: false
    },
    supari: {
        type: Boolean,
        default: false
    },
    sweetener_aspartame: {
        type: Boolean,
        default: false
    },
    sweetner_name: {
        type: Boolean,
        default: false
    },
    table_top_aspartame: {
        type: Boolean,
        default: false
    },
    // part 4
    food_permitted: {
        type: Boolean,
        default: false
    },
    non_nutritive_sweetener: {
        type: Boolean,
        default: false
    },
    mixture_aspartame: {
        type: Boolean,
        default: false
    },
    monosodium_glutamate: {
        type: Boolean,
        default: false
    },
    non_nutritive_sweetener_name: {
        type: String,
        default: null
    },
    mixture_aspartame_sweetener_name: {
        type: String,
        default: null
    },
    // part 5
    plant_stanol: {
        type: Boolean,
        default: false
    },
    plant_sterols: {
        type: Boolean,
        default: false
    },
    trehalose: {
        type: Boolean,
        default: false
    },
    dextrin_soluble_fibre: {
        type: Boolean,
        default: false
    },
    plant_stanol_qty: {
        type: Number,
        default: null
    },
    plant_sterols_qty: {
        type: Number,
        default: null
    },
    // part 6
    product_irradiated: {
        type: Boolean,
        default: false
    },
    gluten_free: {
        type: Boolean,
        default: false
    },
    product_name: {
        type: String,
        default: null
    },
    purpose_of_radiation_processing: {
        type: String,
        default: null
    },
    operating_licence_no: {
        type: String,
        default: null
    },
    batch_identification_no: {
        type: String,
        default: null
    },
    date_of_processing: {
        type: String,
        default: null
    },
    // Name and address
    manufactured_by: {
        type: Boolean,
        default: false
    },
    manufacurer_name: {
        type: String,
        default: null
    },
    manufacurer_address: {
        type: String,
        default: null
    },
    manufacurer_licence_no: {
        type: String,
        default: null
    },
    packed_by: {
        type: Boolean,
        default: false
    },
    packers_name: {
        type: String,
        default: null
    },
    packers_address: {
        type: String,
        default: null
    },
    packers_licence_no: {
        type: String,
        default: null
    },
    marketed_by: {
        type: Boolean,
        default: false
    },
    marketers_name: {
        type: String,
        default: null
    },
    marketers_address: {
        type: String,
        default: null
    },
    marketers_licence_no: {
        type: String,
        default: null
    },
    imported_by: {
        type: Boolean,
        default: false
    },
    importers_name: {
        type: String,
        default: null
    },
    importers_address: {
        type: String,
        default: null
    },
    importers_licence_no: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    fssai_logo: {
        type: String,
        default: null
    },
    // Fortified or Organic
    fortified: {
        type: Boolean,
        default: false
    },
    fortified_with: {
        type: String,
        default: null
    },
    organic: {
        type: Boolean,
        default: false
    },
    // Consumer Care details
    net_qty: {
        type: String,
        default: null
    },
    retail_sale_price: {
        type: String,
        default: null
    },
    consumer_care: {
        type: String,
        default: null
    },
    special_condition: {
        type: String,
        default: null
    },
    storage_condition: {
        type: String,
        default: null,
    },
    // Date Marketing
    date_of_manufacturing: {
        type: String,
        default: null
    },
    expiry_date: {
        type: String,
        default: null,
    },
    best_before_info: {
        type: String,
        default: null,
    },
    // Instruction of use
    instruction: {
        type: String,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('faq', Faq)