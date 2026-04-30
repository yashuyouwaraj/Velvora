package com.Velvora.domain;

public enum AccountStatus {
    PENDING_VERIFICATION,       // The account is awaiting verification of the provided information.
    ACTIVE,                     // The account is active and the user can access all features.
    SUSPENDED,                  // The account is temporarily suspended, possibly due to policy violations or security concerns. The user may have limited access or be unable to log in.
    DEACTIVATED,                // The account has been deactivated by the user or the system. The user cannot log in or access any features.
    BANNED,                     // The account has been permanently banned due to severe violations of policies or terms of service. The user cannot log in or access any features.
    CLOSED                      // The account has been closed, either by the user or the system. The user cannot log in or access any features, and the account data may be retained for a certain period before deletion.
}
