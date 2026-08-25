import type { BlogPost } from "../blog-types";
import pNep from "./nephrology-dialysis-monthly-capitation-billing";
import pChi from "./chiropractic-billing-at-modifier-and-maintenance";
import pWnd from "./wound-care-debridement-depth-and-documentation";
import pDme from "./dme-billing-orders-documentation-and-kx";
import pPed from "./pediatric-billing-vaccines-and-well-child-visits";
import pIm from "./internal-medicine-wellness-visits-and-chronic-care";
import pNeu from "./neurology-billing-nerve-studies-and-eeg";
import pOph from "./ophthalmology-eye-codes-and-plan-routing";
import pPod from "./podiatry-routine-foot-care-coverage";
import pObg from "./obgyn-global-obstetric-package-billing";
import pUro from "./urology-cystoscopy-and-urodynamics-billing";
import pEnt from "./ent-billing-endoscopy-audiology-allergy";
import pGi from "./gastroenterology-screening-vs-diagnostic-colonoscopy";
import pRad from "./radiology-billing-professional-technical-component";
import pDerm from "./dermatology-lesion-billing-and-medical-necessity";
import pPain from "./pain-management-injection-billing";
import pOnc from "./oncology-drug-units-and-infusion-billing";
import pAnes from "./anesthesia-billing-units-and-medical-direction";
import pGs from "./general-surgery-assistant-and-team-billing";
import pUc from "./urgent-care-billing-s-codes-and-modifier-25";
import pCard from "./cardiology-billing-component-denials";
import pFam from "./family-medicine-em-and-preventive-denials";
import pBh from "./behavioral-health-billing-denials";
import pOrtho from "./orthopedic-billing-global-periods";
import pPt from "./physical-therapy-billing-units";
import pCost from "./how-much-does-medical-billing-cost";
import pPriorAuth from "./prior-authorization-denials-appeal";
import p0 from "./top-reasons-medical-claims-get-denied";
import p1 from "./what-is-revenue-cycle-management";
import p2 from "./how-to-improve-clean-claim-rate";
import p3 from "./credentialing-mistakes-that-delay-payments";
import p4 from "./how-practices-lose-revenue-through-ar-aging";
import p5 from "./eligibility-verification-best-practices";
import p6 from "./understanding-medical-coding-updates";

/**
 * Every post, newest first.
 *
 * One module per post rather than one growing array: at three posts a week a
 * single file passes 8,000 lines within a year, which is unreviewable in a
 * diff and a merge conflict on every publish. Adding a post here is two lines.
 *
 * Sorted by `published` at module scope so callers never have to remember to
 * sort, and so the blog index, the sitemap and llms.txt cannot disagree about
 * ordering.
 */
const all: BlogPost[] = [
  pNep,
  pChi,
  pWnd,
  pDme,
  pPed,
  pIm,
  pNeu,
  pOph,
  pPod,
  pObg,
  pUro,
  pEnt,
  pGi,
  pRad,
  pDerm,
  pPain,
  pOnc,
  pAnes,
  pGs,
  pUc,
  pCard,
  pFam,
  pBh,
  pOrtho,
  pPt,
  pCost,
  pPriorAuth,
  p0,
  p1,
  p2,
  p3,
  p4,
  p5,
  p6,
];

export const posts: BlogPost[] = [...all].sort(
  (a, b) => Date.parse(b.published) - Date.parse(a.published),
);
