package com.Velvora.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Data
public class BankDetails {
    private String accountNumber;
    private String accountHolderName;
//    private String bankName;
    private String ifscCode;
}
