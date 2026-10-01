// Writes a person-segmentation mask (white = person) for a still frame, using
// Apple Vision. Used to place Martin on the empty-wall frame for the hero.
//   swift scripts/person-mask.swift <frame.png> <mask.png>
import Foundation
import Vision
import CoreImage
import CoreImage.CIFilterBuiltins

let args = CommandLine.arguments
let input = URL(fileURLWithPath: args[1]), output = URL(fileURLWithPath: args[2])
let image = CIImage(contentsOf: input)!
let request = VNGeneratePersonSegmentationRequest()
request.qualityLevel = .accurate
request.outputPixelFormat = kCVPixelFormatType_OneComponent8
try VNImageRequestHandler(ciImage: image).perform([request])
var mask = CIImage(cvPixelBuffer: request.results!.first!.pixelBuffer)
mask = mask.transformed(by: CGAffineTransform(scaleX: image.extent.width / mask.extent.width, y: image.extent.height / mask.extent.height))
let ctx = CIContext()
try ctx.writePNGRepresentation(of: mask, to: output, format: .L8, colorSpace: CGColorSpaceCreateDeviceGray())
print("mask", mask.extent)
