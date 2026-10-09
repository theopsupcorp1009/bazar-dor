import React from 'react';

const Footer = () => {
    return (
        <div className='border-t border-gray-100 bg-white mt-20 px-5 md:px-0 lg:px-0'>
            <div className='container mx-auto flex flex-col md:flex-row lg:flex-row justify-between items-center text-[12px] py-4'>
                <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
            <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
            </div>
        </div>
    );
};

export default Footer;