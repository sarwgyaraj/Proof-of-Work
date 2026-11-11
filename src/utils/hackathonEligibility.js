// Hackathon Discovery & Eligibility Engine for Proof of Work
// Evaluates candidate's academic status, graduation timeline, tech stack, and location against hackathon rules.

export function evaluateHackathonEligibility(candidate, hackathon) {
  if (!candidate || !hackathon) {
    return {
      status: 'Potential Match',
      badgeClass: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
      reason: 'Additional profile verification needed to confirm eligibility.'
    };
  }

  const { eligibilityCriteria } = hackathon;
  if (!eligibilityCriteria) {
    return {
      status: 'Eligible',
      badgeClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
      reason: 'Open to all Indian student engineers and developers.'
    };
  }

  const reasons = [];
  let isNotEligible = false;
  let notEligibleReason = '';
  let needsConfirmation = false;
  let confirmReason = '';

  // 1. Education / Student Status Check
  const candDegree = (candidate.education?.degree || '').toLowerCase();
  const candInstitution = (candidate.education?.institution || '').toLowerCase();
  const candGradYear = Number(candidate.education?.graduationYear || candidate.graduationYear || 2026);
  const candCurrentYear = (candidate.education?.currentYear || '').toLowerCase();

  if (eligibilityCriteria.mustBeStudent) {
    // Current year check or grad year check (grad year >= 2025/2026 indicates active student)
    if (candGradYear < 2024) {
      isNotEligible = true;
      notEligibleReason = `Requires currently enrolled student status (Graduation year: ${candGradYear}).`;
    } else {
      reasons.push('Open to undergraduate students');
    }
  }

  // 2. Graduation Year Range Check
  if (eligibilityCriteria.allowedGraduationYears && eligibilityCriteria.allowedGraduationYears.length > 0) {
    if (!eligibilityCriteria.allowedGraduationYears.includes(candGradYear)) {
      isNotEligible = true;
      notEligibleReason = `Restricted to batches ${eligibilityCriteria.allowedGraduationYears.join(', ')} (Candidate batch: ${candGradYear}).`;
    } else {
      reasons.push(`Accepts ${candGradYear} graduation batch`);
    }
  }

  // 3. Institution / Tier Restrictons
  if (eligibilityCriteria.restrictedInstitutions) {
    const matchesInst = eligibilityCriteria.restrictedInstitutions.some(inst => 
      candInstitution.includes(inst.toLowerCase())
    );
    if (!matchesInst) {
      isNotEligible = true;
      notEligibleReason = `Campus exclusive to ${eligibilityCriteria.restrictedInstitutions.join(', ')}.`;
    } else {
      reasons.push(`Verified campus affiliate (${candidate.education?.institution})`);
    }
  }

  // 4. Minimum Team Size / Solo Participation
  if (eligibilityCriteria.teamType) {
    if (eligibilityCriteria.teamType === 'Team Only') {
      reasons.push(`Team participation (${hackathon.teamSize || '2-4 members'})`);
    } else if (eligibilityCriteria.teamType === 'Individual or Team') {
      reasons.push('Supports solo & team registrations');
    }
  }

  // 5. Tech Stack & Skills Affinity
  const candidateSkills = [
    ...(candidate.skills || []),
    ...(candidate.technicalSkills || []),
    ...(candidate.programmingLanguages?.map(l => (typeof l === 'string' ? l : l.name)) || [])
  ].map(s => s.toLowerCase());

  const matchingSkills = (hackathon.techStack || []).filter(tech =>
    candidateSkills.some(cs => cs.includes(tech.toLowerCase()) || tech.toLowerCase().includes(cs))
  );

  if (matchingSkills.length > 0) {
    reasons.push(`Matches your skills in ${matchingSkills.slice(0, 3).join(', ')}`);
  }

  // 6. Format & Location
  if (hackathon.format === 'Online') {
    reasons.push('Supports online participation across India');
  } else if (hackathon.format === 'Hybrid') {
    reasons.push('Hybrid format (virtual preliminary round + offline finale)');
  } else if (hackathon.format === 'Offline') {
    const candLoc = (candidate.location || '').toLowerCase();
    const eventCity = (hackathon.city || '').toLowerCase();
    if (candLoc.includes(eventCity) || candLoc.includes('open to') || candLoc.includes('remote')) {
      reasons.push(`In-person in ${hackathon.city}, ${hackathon.state}`);
    } else {
      needsConfirmation = true;
      confirmReason = `Requires in-person attendance in ${hackathon.city}, ${hackathon.state}.`;
    }
  }

  // Final Synthesis
  if (isNotEligible) {
    return {
      status: 'Not Eligible',
      badgeClass: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
      reason: notEligibleReason
    };
  }

  if (needsConfirmation) {
    return {
      status: 'Potential Match',
      badgeClass: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
      reason: `Potential match: ${reasons.slice(0, 2).join(', ')}. Confirmation needed: ${confirmReason}`
    };
  }

  const reasonSummary = reasons.length > 0
    ? `Eligible: ${reasons.join(', ')}.`
    : 'Eligible: All standard participation criteria are met.';

  return {
    status: 'Eligible',
    badgeClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    reason: reasonSummary
  };
}

