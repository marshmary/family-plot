# GEDCOM Update Guide for Admins

## Overview

This guide explains how to update the family tree data. The family tree uses a **bundled GEDCOM** approach, meaning the data file is included in the repository at build time.

**Current Architecture:** The GEDCOM file is imported at build time from `src/gedcoms/family-tree.ged` and bundled into the application.

---

## Quick Reference

**GEDCOM File Location:** `src/gedcoms/family-tree.ged`

**Update Process:** Replace file → Git commit → Git push → Netlify auto-deploys

---

## Step-by-Step Update Process

### Step 1: Export GEDCOM from Your Genealogy Software

Open your genealogy software (Family Tree Maker, Gramps, Legacy, etc.) and:

1. Open your family tree project
2. Go to **File → Export → GEDCOM** (or similar)
3. Choose **GEDCOM 5.5** or **5.5.1** format
4. Save the file (any name, you'll rename it)
5. Choose **UTF-8** character encoding if prompted

**Tips:**
- Export only the people you want to display (some software lets you filter)
- Include all relevant fields: names, dates, places, relationships
- Test with a small export first to verify formatting

---

### Step 2: Replace the GEDCOM File

1. Navigate to the project folder on your computer:
   ```
   family-plot-vn/src/gedcoms/
   ```

2. Copy your new GEDCOM file into this folder

3. Rename it to `family-tree.ged` (overwrite the existing file)

   **On Windows:**
   - If prompted "Replace this file?", click **Yes**
   - If you see a confirmation dialog, confirm the replacement

   **On Mac/Linux:**
   ```bash
   cp /path/to/your/exported.ged family-plot-vn/src/gedcoms/family-tree.ged
   ```

---

### Step 3: Verify the File (Optional but Recommended)

Open `family-tree.ged` in a text editor and check:

- First line should be: `0 HEAD`
- Should contain records like: `0 @I1@ INDI` (individuals)
- Should contain family records: `0 @F1@ FAM`
- Last line should be: `0 TRLR`

If the file looks like gibberish or binary, your software may have exported in a different format. Try again with different export settings.

---

### Step 4: Commit and Push to Git

Open a terminal (or use Git GUI) and run:

```bash
# Navigate to the project folder
cd path/to/family-plot-vn

# Check what changed (should show src/gedcoms/family-tree.ged)
git status

# Stage the GEDCOM file
git add src/gedcoms/family-tree.ged

# Commit with a descriptive message
git commit -m "Update family data - [date or description]"

# Push to trigger deployment
git push
```

**Using Git GUI instead?**
- In GitHub Desktop, GitKraken, or similar: stage the file, write commit message, commit, then push

---

### Step 5: Verify Netlify Deployment

1. Go to your Netlify dashboard (or check the deployment status in your Git provider)

2. You should see a new build starting automatically

3. Wait for deployment to complete (usually 1-3 minutes)

4. Visit your live site to verify the new data appears

**If deployment fails:**
- Check Netlify deploy log for error messages
- Common issues: invalid GEDCOM format, encoding problems
- Try re-exporting from your genealogy software

---

## Update Frequency

You can update the GEDCOM file as often as needed:

- **Small updates** (adding a birth, marriage, death): Follow the full process above
- **Large updates** (major family research additions): Test locally first
- **Routine maintenance**: Consider a regular schedule (monthly, quarterly)

---

## Testing Updates Locally (Recommended)

Before pushing to production, test the update locally:

```bash
# After replacing the GEDCOM file
cd family-plot-vn

# Install dependencies if needed
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
# Verify the family tree displays correctly
```

Check for:
- All individuals appear in the tree
- Relationships are correct (parents, children, spouses)
- Dates and places display properly
- No errors in browser console (F12 → Console)

---

## Troubleshooting

### Problem: Tree doesn't display after update

**Possible causes:**
1. Invalid GEDCOM format
2. File encoding is not UTF-8
3. Missing required GEDCOM tags

**Solution:**
- Re-export from genealogy software with UTF-8 encoding
- Check file starts with `0 HEAD` and ends with `0 TRLR`
- Compare with the previous working GEDCOM file

---

### Problem: Some people are missing

**Possible causes:**
1. Not all individuals were included in export
2. GEDCOM export filter was too restrictive

**Solution:**
- Check export settings in genealogy software
- Ensure "Include all individuals" or similar is selected
- Verify the exported file contains expected records

---

### Problem: Relationships look wrong

**Possible causes:**
1. Family links missing in GEDCOM
2. Incorrect GEDCOM structure

**Solution:**
- Check that family records (`0 @F...@ FAM`) exist in the file
- Verify `HUSB`, `WIFE`, `CHIL` pointers are correct
- May need to fix in genealogy software and re-export

---

### Problem: Netlify build fails

**Check the deploy log for:**
- File encoding errors
- Missing file errors
- Build script failures

**Solution:**
- Verify `family-tree.ged` exists in `src/gedcoms/`
- Check file is valid text (not binary or corrupted)
- Try committing and pushing again

---

## Privacy Considerations

**Before committing GEDCOM files:**

- [ ] Review data for living individuals
- [ ] Consider privacy implications of public family tree
- [ ] Ensure all family members are comfortable with published data
- [ ] Remove sensitive information if needed

**Netlify is public by default.** If you need privacy:
- Enable Netlify password protection (see Netlify docs)
- Or use a different deployment method

---

## Version Control Tips

### Viewing GEDCOM History

```bash
# See when GEDCOM was last updated
git log -- src/gedcoms/family-tree.ged

# Compare current GEDCOM with previous version
git diff HEAD~1 -- src/gedcoms/family-tree.ged
```

### Reverting to Previous Version

If the new GEDCOM has problems:

```bash
# Revert to previous commit's GEDCOM
git checkout HEAD~1 -- src/gedcoms/family-tree.ged

# Commit the revert
git commit -m "Revert to previous GEDCOM"
git push
```

---

## Summary

| What | Where | How |
|------|-------|-----|
| **GEDCOM Location** | `src/gedcoms/family-tree.ged` | Replace this file |
| **Update Trigger** | Git push | Commit and push to trigger deploy |
| **Deployment** | Netlify | Automatic on push |
| **Testing** | Local dev server | `npm run dev` |
| **Character Encoding** | UTF-8 | Required for proper display |

---

## Need Help?

If you encounter issues:

1. Check this guide's troubleshooting section
2. Verify GEDCOM format (should be readable text)
3. Check browser console for errors
4. Review Netlify deploy log

---

**Document Created:** 2026-03-21 (Story 1.4)
**Last Updated:** 2026-03-22 (Updated for bundled GEDCOM architecture)
