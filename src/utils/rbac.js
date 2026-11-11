// Centralized Role-Based Access Control (RBAC) System for Proof of Work
// Defines Roles, Permission Tokens, Role Capabilities, and Evaluation Guards.

export const ROLES = {
  CANDIDATE: 'candidate',
  EMPLOYER: 'employer',
  ADMIN: 'admin'
};

export const PERMISSIONS = {
  // Candidate Domain
  ACCESS_CANDIDATE_DASHBOARD: 'candidate:dashboard:access',
  EDIT_OWN_PROFILE: 'candidate:profile:edit_own',
  MANAGE_OWN_PROJECTS: 'candidate:projects:manage_own',
  MANAGE_OWN_CODING_PROFILES: 'candidate:coding_profiles:manage_own',
  PARTICIPATE_CHALLENGES: 'candidate:challenges:participate',
  VIEW_OWN_SUBMISSIONS: 'candidate:submissions:view_own',
  DISCOVER_HACKATHONS: 'candidate:hackathons:discover',
  BOOKMARK_HACKATHONS: 'candidate:hackathons:bookmark',
  CONTROL_PROFILE_VISIBILITY: 'candidate:visibility:control',

  // Employer Domain
  ACCESS_EMPLOYER_DASHBOARD: 'employer:dashboard:access',
  MANAGE_COMPANY_PROFILE: 'employer:company:manage',
  ACCESS_TALENT_DISCOVERY: 'employer:talent:discover',
  VIEW_CANDIDATE_PROFILES: 'employer:candidates:view_profiles',
  SHORTLIST_CANDIDATES: 'employer:candidates:shortlist',
  MANAGE_RECRUITER_NOTES: 'employer:notes:manage',
  MANAGE_HIRING_PIPELINE: 'employer:pipeline:manage',
  SEND_INTERVIEW_INVITES: 'employer:interviews:send',

  // Admin Domain
  ACCESS_ADMIN_DASHBOARD: 'admin:dashboard:access',
  VIEW_PLATFORM_ANALYTICS: 'admin:analytics:view',
  MANAGE_CANDIDATE_ACCOUNTS: 'admin:users:candidates:manage',
  MANAGE_EMPLOYER_ACCOUNTS: 'admin:users:employers:manage',
  APPROVE_SUSPEND_USERS: 'admin:users:status:modify',
  ASSIGN_USER_ROLES: 'admin:roles:assign',
  VERIFY_ORGANIZATIONS: 'admin:organizations:verify',
  MODERATE_REVIEWS_AND_CONTENT: 'admin:content:moderate',
  MANAGE_HACKATHONS_CATALOG: 'admin:hackathons:manage',
  MANAGE_CHALLENGES_CATALOG: 'admin:challenges:manage',
  VIEW_AUDIT_LOGS: 'admin:audit_logs:view',
  MANAGE_PLATFORM_SETTINGS: 'admin:settings:manage'
};

// Role-to-Permissions Mapping Table
export const ROLE_PERMISSIONS = {
  [ROLES.CANDIDATE]: [
    PERMISSIONS.ACCESS_CANDIDATE_DASHBOARD,
    PERMISSIONS.EDIT_OWN_PROFILE,
    PERMISSIONS.MANAGE_OWN_PROJECTS,
    PERMISSIONS.MANAGE_OWN_CODING_PROFILES,
    PERMISSIONS.PARTICIPATE_CHALLENGES,
    PERMISSIONS.VIEW_OWN_SUBMISSIONS,
    PERMISSIONS.DISCOVER_HACKATHONS,
    PERMISSIONS.BOOKMARK_HACKATHONS,
    PERMISSIONS.CONTROL_PROFILE_VISIBILITY,
    PERMISSIONS.VIEW_CANDIDATE_PROFILES // Candidates can view public profiles
  ],

  [ROLES.EMPLOYER]: [
    PERMISSIONS.ACCESS_EMPLOYER_DASHBOARD,
    PERMISSIONS.MANAGE_COMPANY_PROFILE,
    PERMISSIONS.ACCESS_TALENT_DISCOVERY,
    PERMISSIONS.VIEW_CANDIDATE_PROFILES,
    PERMISSIONS.SHORTLIST_CANDIDATES,
    PERMISSIONS.MANAGE_RECRUITER_NOTES,
    PERMISSIONS.MANAGE_HIRING_PIPELINE,
    PERMISSIONS.SEND_INTERVIEW_INVITES,
    PERMISSIONS.DISCOVER_HACKATHONS // Employers can inspect hackathon ecosystems
  ],

  [ROLES.ADMIN]: [
    // Full platform administrative capabilities
    PERMISSIONS.ACCESS_ADMIN_DASHBOARD,
    PERMISSIONS.VIEW_PLATFORM_ANALYTICS,
    PERMISSIONS.MANAGE_CANDIDATE_ACCOUNTS,
    PERMISSIONS.MANAGE_EMPLOYER_ACCOUNTS,
    PERMISSIONS.APPROVE_SUSPEND_USERS,
    PERMISSIONS.ASSIGN_USER_ROLES,
    PERMISSIONS.VERIFY_ORGANIZATIONS,
    PERMISSIONS.MODERATE_REVIEWS_AND_CONTENT,
    PERMISSIONS.MANAGE_HACKATHONS_CATALOG,
    PERMISSIONS.MANAGE_CHALLENGES_CATALOG,
    PERMISSIONS.VIEW_AUDIT_LOGS,
    PERMISSIONS.MANAGE_PLATFORM_SETTINGS,
    // Read-only oversight into user-facing directories
    PERMISSIONS.VIEW_CANDIDATE_PROFILES,
    PERMISSIONS.ACCESS_TALENT_DISCOVERY,
    PERMISSIONS.DISCOVER_HACKATHONS
  ]
};

// Route Access Matrix mapping route views to required permissions and allowed roles
export const ROUTE_ACCESS = {
  'landing': { public: true },
  'login': { public: true },
  'candidate-dashboard': {
    requiredPermission: PERMISSIONS.ACCESS_CANDIDATE_DASHBOARD,
    allowedRoles: [ROLES.CANDIDATE],
    fallbackRoute: 'login'
  },
  'employer-dashboard': {
    requiredPermission: PERMISSIONS.ACCESS_EMPLOYER_DASHBOARD,
    allowedRoles: [ROLES.EMPLOYER],
    fallbackRoute: 'login'
  },
  'admin-dashboard': {
    requiredPermission: PERMISSIONS.ACCESS_ADMIN_DASHBOARD,
    allowedRoles: [ROLES.ADMIN],
    fallbackRoute: 'login'
  },
  'talent': {
    requiredPermission: PERMISSIONS.ACCESS_TALENT_DISCOVERY,
    allowedRoles: [ROLES.EMPLOYER, ROLES.ADMIN],
    fallbackRoute: 'candidate-dashboard'
  },
  'challenges': {
    // Open to candidate solvers, and inspectable by admins/employers
    public: true
  },
  'submit-project': {
    requiredPermission: PERMISSIONS.MANAGE_OWN_PROJECTS,
    allowedRoles: [ROLES.CANDIDATE],
    fallbackRoute: 'employer-dashboard'
  },
  'profile': {
    requiredPermission: PERMISSIONS.VIEW_CANDIDATE_PROFILES,
    allowedRoles: [ROLES.CANDIDATE, ROLES.EMPLOYER, ROLES.ADMIN],
    fallbackRoute: 'login'
  },
  'hackathons': {
    requiredPermission: PERMISSIONS.DISCOVER_HACKATHONS,
    allowedRoles: [ROLES.CANDIDATE, ROLES.EMPLOYER, ROLES.ADMIN],
    fallbackRoute: 'login'
  }
};

/**
 * Check if a user has a specific permission.
 */
export function hasPermission(user, permission) {
  if (!user || !user.role) return false;
  const userRole = user.role.toLowerCase();
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(permission);
}

/**
 * Check if a user has any of the listed permissions.
 */
export function hasAnyPermission(user, permissionsList = []) {
  if (!user || !user.role) return false;
  return permissionsList.some(p => hasPermission(user, p));
}

/**
 * Check if a user can access a specific view/route.
 */
export function canAccessRoute(user, routeView) {
  const routeConfig = ROUTE_ACCESS[routeView];
  if (!routeConfig) return true; // Default fallback allows undefined routes or redirects to landing
  if (routeConfig.public) return true;

  if (!user || !user.role) return false;
  const userRole = user.role.toLowerCase();

  if (routeConfig.allowedRoles && !routeConfig.allowedRoles.includes(userRole)) {
    return false;
  }

  if (routeConfig.requiredPermission && !hasPermission(user, routeConfig.requiredPermission)) {
    return false;
  }

  return true;
}

/**
 * Check if a candidate user can modify a specific resource (Resource Ownership Check).
 */
export function canModifyCandidateData(user, candidateId) {
  if (!user) return false;
  // Candidates can only modify their own data
  if (user.role === ROLES.CANDIDATE) {
    return user.id === candidateId;
  }
  // Admins can manage accounts via authorized operations
  if (user.role === ROLES.ADMIN) {
    return true;
  }
  // Employers can never modify candidate profiles
  return false;
}

/**
 * Check if an employer user can modify an employer resource.
 */
export function canModifyEmployerData(user, employerId) {
  if (!user) return false;
  if (user.role === ROLES.EMPLOYER) {
    return user.id === employerId;
  }
  if (user.role === ROLES.ADMIN) {
    return true;
  }
  return false;
}

