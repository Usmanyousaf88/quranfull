import React from "react";

const QuranFooter = () => {
  return (
    <footer className="bg-background border-t border-gray-200 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-gray-600 italic">
            "This is what I can give to my father for the next life"
          </p>
          <div className="prose prose-gray mx-auto">
            <p className="text-gray-700 leading-relaxed">
              Dear reader, if your parents are alive, please treasure every moment with them. 
              Put away your mobile phone, sit with them, talk to them, 
              answer their questions patiently, and make them happy. 
              These moments are precious and irreplaceable. 
              Take care of your parents while you still can - call them regularly 
              and show them your love and appreciation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default QuranFooter;