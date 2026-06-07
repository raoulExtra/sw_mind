import unittest
import subprocess
import os
import tempfile
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from kilo_client import kilo_run


class TestFileHarness(unittest.TestCase):
    
    def test_line_by_line_processing(self):
        """TEST-HARN-01: Test line-by-line file processing"""
        with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False) as f:
            f.write("hello\n")
            f.write("world\n")
            temp_path = f.name
        
        try:
            results = []
            with open(temp_path, 'r') as f:
                for line in f:
                    line = line.strip()
                    if line:
                        result = kilo_run(line, attach="http://localhost:4096")
                        results.append(result)
            
            self.assertEqual(len(results), 2)
            self.assertIn('text', results[0])
            self.assertIn('text', results[1])
        finally:
            os.unlink(temp_path)
    
    def test_comment_handling(self):
        """TEST-HARN-02: Test comment handling"""
        with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False) as f:
            f.write("# this is a comment\n")
            f.write("hello\n")
            temp_path = f.name
        
        try:
            queries = []
            with open(temp_path, 'r') as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#'):
                        queries.append(line)
            
            self.assertEqual(len(queries), 1)
            self.assertEqual(queries[0], "hello")
        finally:
            os.unlink(temp_path)
    
    def test_empty_line_handling(self):
        """TEST-HARN-03: Test empty line handling"""
        with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False) as f:
            f.write("\n")
            f.write("hello\n")
            f.write("\n")
            temp_path = f.name
        
        try:
            queries = []
            with open(temp_path, 'r') as f:
                for line in f:
                    line = line.strip()
                    if line:
                        queries.append(line)
            
            self.assertEqual(len(queries), 1)
            self.assertEqual(queries[0], "hello")
        finally:
            os.unlink(temp_path)
    
    def test_harness_script_exists(self):
        """TEST-HARN-05: Test harness script exists and is executable"""
        harness_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "requi", "harness")
        harness_script = os.path.join(harness_dir, "run_harness.py")
        self.assertTrue(os.path.exists(harness_script), f"Harness script not found at {harness_script}")
    
    def test_harness_test_file_exists(self):
        """TEST-HARN-06: Test test queries file exists"""
        harness_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "requi", "harness")
        test_file = os.path.join(harness_dir, "test_queries.txt")
        self.assertTrue(os.path.exists(test_file), f"Test file not found at {test_file}")
    
    def test_answerfile_storage(self):
        """TEST-HARN-07: Test each answer stored in separate file with incremental counter"""
        harness_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "requi", "harness")
        for i in range(1, 10):
            answer_file = os.path.join(harness_dir, f"answer_{i}.txt")
            if os.path.exists(answer_file):
                os.unlink(answer_file)
        harness_script = os.path.join(harness_dir, "run_harness.py")
        test_file = os.path.join(harness_dir, "test_queries.txt")
        result = subprocess.run(
            [sys.executable, harness_script, test_file],
            capture_output=True,
            text=True
        )
        self.assertTrue(os.path.exists(os.path.join(harness_dir, "answer_1.txt")), "answer_1.txt not created")
        self.assertTrue(os.path.exists(os.path.join(harness_dir, "answer_2.txt")), "answer_2.txt not created")
        self.assertTrue(os.path.exists(os.path.join(harness_dir, "answer_3.txt")), "answer_3.txt not created")
        for i in range(1, 10):
            answer_file = os.path.join(harness_dir, f"answer_{i}.txt")
            if os.path.exists(answer_file):
                os.unlink(answer_file)
    
    def test_answer_pure_storage(self):
        """TEST-HARN-08: Test pure text answer stored in answer_pure_<counter>.txt"""
        harness_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "requi", "harness")
        for i in range(1, 10):
            pure_file = os.path.join(harness_dir, f"answer_pure_{i}.txt")
            if os.path.exists(pure_file):
                os.unlink(pure_file)
        harness_script = os.path.join(harness_dir, "run_harness.py")
        test_file = os.path.join(harness_dir, "test_queries.txt")
        result = subprocess.run(
            [sys.executable, harness_script, test_file],
            capture_output=True,
            text=True
        )
        self.assertTrue(os.path.exists(os.path.join(harness_dir, "answer_pure_1.txt")), "answer_pure_1.txt not created")
        self.assertTrue(os.path.exists(os.path.join(harness_dir, "answer_pure_2.txt")), "answer_pure_2.txt not created")
        self.assertTrue(os.path.exists(os.path.join(harness_dir, "answer_pure_3.txt")), "answer_pure_3.txt not created")
        for i in range(1, 10):
            pure_file = os.path.join(harness_dir, f"answer_pure_{i}.txt")
            if os.path.exists(pure_file):
                os.unlink(pure_file)


if __name__ == '__main__':
    unittest.main()