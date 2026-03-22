/**
 * GEDCOM File Validation Utility
 *
 * Validates GEDCOM files before parsing to prevent malformed or malicious files
 * from crashing the app or injecting harmful content.
 */

const MAX_GEDCOM_SIZE = 50 * 1024 * 1024 // 50MB

/**
 * Validate a GEDCOM file before parsing
 * @param {File|string} file - File object or content string
 * @param {number} fileSize - Size in bytes (if content string is passed)
 * @returns {Object} Validation result with valid, error, summary properties
 */
export function validateGedcomFile(file, fileSize) {
  const errors = []
  const warnings = []

  // 1. Size validation
  const size = fileSize || (file instanceof File ? file.size : 0)
  if (size > MAX_GEDCOM_SIZE) {
    return {
      valid: false,
      error: `File size exceeds maximum of 50MB. Your file is ${(size / 1024 / 1024).toFixed(2)}MB.`
    }
  }

  // 2. Get content as string
  let content = file
  if (file instanceof File || file instanceof Blob) {
    // For File/Blob objects, return async validator
    return file.text().then(text => validateGedcomContent(text, size))
  }

  return validateGedcomContent(content, size)
}

/**
 * Validate GEDCOM content string
 */
function validateGedcomContent(content, fileSize = 0) {
  const warnings = []

  // 2. Check for UTF-8 BOM
  const hasBOM = content.charCodeAt(0) === 0xFEFF
  const cleanContent = hasBOM ? content.slice(1) : content

  // 3. Basic structure validation
  if (!cleanContent.includes('0 HEAD')) {
    return {
      valid: false,
      error: 'Invalid GEDCOM file: Missing HEADER record (0 HEAD)'
    }
  }

  if (!cleanContent.includes('0 TRLR')) {
    warnings.push('File may be incomplete: Missing TRAILER record (0 TRLR)')
  }

  // 4. Check character encoding declaration
  const charsetMatch = cleanContent.match(/1 CHAR (.+)/)
  if (charsetMatch) {
    const charset = charsetMatch[1].trim()
    if (charset !== 'UTF-8' && charset !== 'ANSEL' && charset !== 'ASCII') {
      warnings.push(`Unusual character encoding: ${charset}. UTF-8 recommended.`)
    }
  }

  // 5. Count records for summary
  const individualCount = (cleanContent.match(/0 @.+@ INDI/g) || []).length
  const familyCount = (cleanContent.match(/0 @.+@ FAM/g) || []).length

  return {
    valid: true,
    summary: {
      individuals: individualCount,
      families: familyCount,
      fileSize,
      warnings
    },
    content: cleanContent
  }
}

/**
 * Parse GEDCOM content with error handling
 * @param {string} content - GEDCOM content string
 * @param {Function} parserFn - Parser function to use (e.g., gedcom.parse)
 * @returns {Object} Parse result with success, data/error properties
 */
export function parseGedcom(content, parserFn) {
  try {
    // Run parser
    const data = parserFn(content)

    return {
      success: true,
      data
    }
  } catch (error) {
    // Log full error in development
    if (import.meta.env.DEV) {
      console.error('GEDCOM parsing error:', error)
    }

    return {
      success: false,
      error: 'Unable to read family tree file. Please check the file format.'
    }
  }
}

/**
 * Async version of GEDCOM validation and parsing
 * @param {File} file - File object from input
 * @param {Function} parserFn - Parser function
 * @returns {Promise<Object>} Result object
 */
export async function validateAndParseGedcom(file, parserFn) {
  // Validate file first
  const validationResult = await validateGedcomFile(file)

  if (!validationResult.valid) {
    return validationResult
  }

  // Parse the validated content
  const content = validationResult.content || file
  return parseGedcom(content, parserFn)
}
