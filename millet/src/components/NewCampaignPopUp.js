import React, { useState } from 'react';
import './NewCampaignPopUp.css';

const NewCampaignPopUp = ({ isOpen, onClose, addNewCampaign }) => {
    const [formData, setFormData] = useState({
        productName: '',
        campaignType: '',
        price: '$0.00',
        endDate: '',
        category: '',
        audience: '',
        feeModel: '',
        startingRate: '',
        isNegotiable: false,
        productImage: '',
        productDescription: '',
    });
    
    const [errors, setErrors] = useState({
        productName: '',
        campaignType: '',
        price: '',
        endDate: '',
        category: '',
        audience: '',
        feeModel: '',
        startingRate: '',
        productImage: '',
        productDescription: '',
    });
    
    

    const [activeTab, setActiveTab] = useState('summary'); // Track active tab
    const [errorMessage, setErrorMessage] = useState('');  // Store validation errors

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        if (name === 'price') {
            // Allow only numeric characters and a single decimal point
            let numericValue = value.replace(/[^0-9.]/g, ''); // Remove any non-numeric character except '.'
        
            // Prevent leading zeros unless the value is a decimal like '0.xx'
            if (numericValue.length > 1 && numericValue.startsWith('0') && numericValue[1] !== '.') {
                numericValue = numericValue.replace(/^0+/, ''); // Remove leading zeros if not a decimal
            }
        
            // Ensure a valid format with only one decimal point
            if (numericValue.split('.').length > 2) {
                numericValue = numericValue.slice(0, -1);
            }
        
            // Prepend the dollar sign and ensure the format
            const formattedPrice = `$${numericValue}`;
        
            setFormData((prevData) => ({
                ...prevData,
                price: formattedPrice,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };
    
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const {
            productName,
            campaignType,
            price,
            endDate,
            category,
            audience,
            feeModel,
            startingRate,
            productImage,
            productDescription,
        } = formData;
    
        let validationErrors = {};
    
        // Check if all fields are filled in
        if (!productName) validationErrors.productName = 'Please enter the product name';
        if (!campaignType) validationErrors.campaignType = 'Please select the campaign type';
        if (!price || parseFloat(price.replace(/[^0-9.]/g, '')) < 0.01) {
            validationErrors.price = 'Price must be at least $0.01';
        } else if (parseFloat(price.replace(/[^0-9.]/g, '')) > 10000) {
            validationErrors.price = 'Price cannot exceed $10,000';
        }
        if (!endDate) validationErrors.endDate = 'Please select an end date';
        if (!category) validationErrors.category = 'Please select a category';
        if (!audience) validationErrors.audience = 'Please select an audience';
        if (!feeModel) validationErrors.feeModel = 'Please select a fee model';
    
        // Validate starting rate based on fee model
        if (feeModel === 'Flat Rate') {
            const startingRateValue = parseFloat(startingRate.replace(/[^0-9.]/g, ''));
            if (!startingRate || startingRateValue < 0.01) {
                validationErrors.startingRate = 'Flat Rate must be at least $0.01';
            } else if (startingRateValue > 10000) {
                validationErrors.startingRate = 'Flat Rate cannot exceed $10,000';
            }
        } else if (feeModel === 'Commission') {
            const commissionValue = parseFloat(startingRate.replace(/[^0-9.]/g, ''));
            if (!startingRate || commissionValue < 1 || commissionValue > 100) {
                validationErrors.startingRate = 'Commission must be between 1.00% and 100.00%';
            }
        }
    
        if (!productImage) validationErrors.productImage = 'Please upload a product image';
        if (!productDescription) validationErrors.productDescription = 'Please enter a product description';
    
        setErrors(validationErrors);
    
        // If there are validation errors, stop form submission
        if (Object.keys(validationErrors).length > 0) {
            return;
        }
    
        // Clear error message if all fields are filled
        setErrorMessage('');
    
        const token = localStorage.getItem('token'); // Or however you're storing the JWT token
    
        try {
            const response = await fetch('http://localhost:5000/api/create-campaign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Send token in Authorization header
                },
                body: JSON.stringify({
                    productName,
                    campaignType,
                    price: parseFloat(price.replace(/[^0-9.]/g, '')), // Ensure price is a valid number
                    endDate,
                    category,
                    audience,
                    feeModel,
                    startingRate: parseFloat(startingRate.replace(/[^0-9.]/g, '')), // Store as number without special characters
                    isNegotiable: formData.isNegotiable,
                    productImage,
                    productDescription,
                }),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log('Campaign created with ID:', result.campaignId);
    
                // Add the new campaign to the list
                addNewCampaign({
                    id: result.campaignId,
                    product_name: productName,
                    campaign_type: campaignType,
                    price: `$${price}`,
                    end_date: endDate,
                    category,
                    audience,
                    fee_model: feeModel,
                    starting_rate: startingRate,
                    negotiable: formData.isNegotiable,
                    product_image: productImage,
                    product_description: productDescription,
                });
    
                onClose(); // Close the modal after submission
            } else {
                console.error('Failed to create campaign');
            }
        } catch (err) {
            console.error('Error creating campaign:', err);
        }
    };
    
    
    
    
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Assuming you store the image as a URL (local URL for preview)
            const imageURL = URL.createObjectURL(file);
            setFormData((prevData) => ({
                ...prevData,
                productImage: imageURL, // Update formData with the image URL
            }));
        }
    };

    const handleStartingRateChange = (e) => {
        let { value } = e.target;
    
        // Ensure the dollar sign is always present
        value = value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters except '.'
        if (value.split('.').length > 2) {
            // Remove additional decimal points if more than one exists
            value = value.slice(0, -1);
        }
    
        // Prepend the dollar sign
        setFormData((prevData) => ({
            ...prevData,
            startingRate: `$${value}`,
        }));
    };
    
    

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-modal" onClick={onClose}>X</button>
                <h2>Create Campaign</h2>

                {/* Show validation error if any */}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                {/* Toggle buttons for Summary and Description */}
                <div className="tab-container">
                    <button
                        className={`tab ${activeTab === 'summary' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('summary')}
                    >
                        Summary
                    </button>
                    <button
                        className={`tab ${activeTab === 'description' ? 'active-tab' : ''}`}
                        onClick={() => setActiveTab('description')}
                    >
                        Description
                    </button>
                </div>

                {activeTab === 'summary' ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="form-group-half">
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    name="productName"
                                    placeholder="Enter product name"
                                    value={formData.productName}
                                    onChange={handleInputChange}
                                    style={{
                                        borderColor: errors.productName ? 'red' : '#ccc', // Highlight border if there's an error
                                    }}
                                />
                                {errors.productName && (
                                    <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.productName}</p>
                                )}
                            </div>
                            <div className="form-group-half">
    <label>Campaign Type</label>
    <select
        name="campaignType"
        value={formData.campaignType}
        onChange={handleInputChange}
        style={{
            borderColor: errors.campaignType ? 'red' : '#ccc', // Highlight border if there's an error
        }}
    >
        <option value="">Select campaign type</option>
        <option value="Livestream">Livestream</option>
        <option value="Short Video">Short Video</option>
    </select>
    {errors.campaignType && (
        <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.campaignType}</p>
    )}
</div>

<div className="form-group-half">
    <label>Price (USD)</label>
    <input
        type="text"
        name="price"
        placeholder="$0.01"
        value={formData.price}
        onChange={handleInputChange}
        style={{
            borderColor: errors.price ? 'red' : '#ccc', // Highlight border if there's an error
        }}
    />
    {errors.price && (
        <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.price}</p>
    )}
</div>



<div className="form-group-half">
    <label>End Date</label>
    <input
        type="date"
        name="endDate"
        min={new Date().toISOString().split('T')[0]}  // Setting min to today
        placeholder="Select end date"
        value={formData.endDate}
        onChange={handleInputChange}
        style={{
            borderColor: errors.endDate ? 'red' : '#ccc', // Highlight border if there's an error
        }}
    />
    {errors.endDate && (
        <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.endDate}</p>
    )}
</div>


<div className="form-group-half">
    <label>Category</label>
    <select
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        style={{
            borderColor: errors.category ? 'red' : '#ccc', // Highlight border if there's an error
        }}
    >
        <option value="">Select category</option>
        <option value="Beauty">Beauty</option>
        <option value="Tech">Tech</option>
    </select>
    {errors.category && (
        <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.category}</p>
    )}
</div>

<div className="form-group-half">
    <label>Audience</label>
    <select
        name="audience"
        value={formData.audience}
        onChange={handleInputChange}
        style={{
            borderColor: errors.audience ? 'red' : '#ccc', // Highlight border if there's an error
        }}
    >
        <option value="">Select audience</option>
        <option value="General">General</option>
        <option value="Specific">Specific</option>
    </select>
    {errors.audience && (
        <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.audience}</p>
    )}
</div>

                            <div className="form-group-half">
                                <label>Fee Model</label>
                                <select
                                    name="feeModel"
                                    value={formData.feeModel}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Fee Model</option>
                                    <option value="Commission">Commission</option>
                                    <option value="Flat Rate">Flat Rate</option>
                                </select>
                            </div>
                            <div className="form-group-half">
    <label>Starting Rate</label>
    <div className="starting-rate-container">
        <input
            type="text"
            name="startingRate"
            placeholder={formData.feeModel === 'Flat Rate' ? 'Enter flat rate' : 'Enter percentage'}
            value={formData.startingRate}
            onChange={handleStartingRateChange}
            disabled={!formData.feeModel}
            style={{
                backgroundColor: !formData.feeModel ? '#e0e0e0' : '#fff',
                borderColor: errors.startingRate ? 'red' : '#ccc', // Highlight border if there's an error
            }}
        />
        {errors.startingRate && (
            <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.startingRate}</p>
        )}
    </div>
</div>


                        </div>

                        {/* Move upload image below form fields and above the checkbox */}
                        <div className="upload-image-container">
                            <label htmlFor="image-upload" className="upload-image-button">
                                {formData.productImage ? 'Change Image' : 'Upload Image'}
                            </label>
                            <input
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageUpload}
                            />
                            {formData.productImage && (
                                <img
                                    src={formData.productImage}
                                    alt="Uploaded"
                                    style={{
                                        marginTop: '10px',
                                        maxWidth: '100%',
                                        borderRadius: '5px',
                                        border: '1px solid #ccc',
                                    }}
                                />
                            )}
                        </div>

                        <div className="checkbox-container">
                            <label>My starting rates are negotiable.</label>
                            <input
                                type="checkbox"
                                name="isNegotiable"
                                checked={formData.isNegotiable}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" className="submit-button">Save</button>
                    </form>
                ) : (
                    <div className="description-container">
                        <label>Product Description</label>
                        <textarea
                            name="productDescription"
                            placeholder="Write the product description"
                            value={formData.productDescription}
                            onChange={handleInputChange}
                            style={{
                                borderColor: errors.productDescription ? 'red' : '#ccc', // Highlight border if there's an error
                            }}
                        />
                        {errors.productDescription && (
                            <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.productDescription}</p>
                        )}
                        <button type="submit" className="submit-button">Save</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewCampaignPopUp;
