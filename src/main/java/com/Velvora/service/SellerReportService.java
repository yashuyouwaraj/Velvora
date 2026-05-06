package com.Velvora.service;

import com.Velvora.model.Seller;
import com.Velvora.model.SellerReport;

public interface SellerReportService {
    SellerReport getSellerReport(Seller seller);
    SellerReport updateSellerReport(SellerReport sellerReport);

}
