#!/usr/bin/env python3
# Mon 15 Dec 13:36:08 GMT 2025 0.1 started
# Mon 15 Dec 13:50:36 GMT 2025 0.9 coded
# Mon 15 Dec 13:58:06 GMT 2025 1.0 working
# Fri 13 Feb 11:57:07 GMT 2026 1.1 added top_freq
import os
import sys
import time
import argparse


DESCRIPTION = """
Script to filter a panproteome fasta file (-i) by protein frequency (PF), i.e. by the percentage of
the analysed proteomes having a sequence in the cluster this sequence represents.
Only sequences with a PF >= the given min threshold (-m) will be written to the output file (-o).
Alternatively, only sequences with a PF <= a given top threshold (-t) will be written.
Options -t and -m can be combined.

Sample input file:
    >PP|UPI000015C836 94% UP000000625 AAC73113 OX=83333 OS=Escherichia coli str. K-12 substr. MG1655 ; sp|P00561|AK1H_ECOLI Bifunctional aspartokinase/homoserine dehydrogenase 1 GN=thrA PE=1
    MRVLKFGGTSVANAERFLRVADILESNARQGQVATVLSAPAKITN [...]

    (PF in this case is 94%)

Example call:
    filter_pp_fasta.py -i pp562.fasta -o pp562_50pct.fasta -m 50
"""


# helper functions
def secs2time(secs):
    """
    Converts a time duration in seconds to a human-readable format (hours, minutes, seconds).

    Args:
        secs (int): Time duration in seconds.

    Returns:
        str: A formatted string representing the time in "HHh MMm SSs" format.

    Example:
        secs2time(3663)  # Output: "01h 01m 03s"
    """
    minutes, seconds = divmod(secs, 60)
    hours, minutes = divmod(minutes, 60)
    return "{:02.0f}h {:02.0f}m {:02.0f}s".format(hours, minutes, seconds)


def elapsed_time(start_time, work_done=None):
    """
    Computes the elapsed time from a given start time in seconds and returns a formatted string.
    If `work_done` is specified, also computes the speed of the process.

    Args:
        start_time (float): The start time in seconds (from time.time()).
        work_done (int, optional): Number of completed iterations or tasks.

    Returns:
        str or tuple: A formatted string with elapsed time if `work_done` is None,
                      otherwise a tuple with formatted elapsed time and computed speed in "it/s".

    Example:
        start_secs = time.time()
        time.sleep(2)
        print(" '-- Elapsed: {} --'".format(elapsed_time(start_secs)))
        # Output example: " '-- Elapsed: 00h 00m 02s --'"

        iterations_done = 10
        print(" '-- Elapsed: {}, {} it/s --'".format(*elapsed_time(start_secs, iterations_done)))
        # Output example: " '-- Elapsed: 00h 00m 02s, 5.0 it/s --'"
    """
    process_time = time.time() - start_time
    if work_done is None:
        return secs2time(process_time)
    process_speed = round(work_done / process_time, 2)
    return secs2time(process_time), process_speed


def exit_with_error(message: str, code: int = 1):
    """
    Prints an error message to stderr and exits the program with the specified exit code.

    Args:
        message (str): The error message to display.
        code (int): The exit code to return upon termination (default: 1).
    """
    eprint(f"   => {message}")
    sys.exit(code)


def eprint(*myargs, **kwargs):
    """
    Prints the provided arguments to stderr, useful for logging errors or status without cluttering stdout.

    Args:
        *myargs: Variable length argument list, elements to be printed.
        **kwargs: Arbitrary keyword arguments (e.g., end='\n').

    Returns:
        None
    """
    print(*myargs, file=sys.stderr, **kwargs)


# functions
def check_args():
    """
    parse arguments and check for error conditions
    """
    def positive_integer(value):
        try:
            value = int(value)
            if value <= 0:
                raise argparse.ArgumentTypeError(
                    "{} is not a positive integer".format(value)
                )
        except ValueError:
            raise Exception("{} is not an integer".format(value))
        return value

    def is_valid_file(path):
        """Check if the given path is a valid, readable file."""
        if not path:
            raise argparse.ArgumentTypeError(f"File path cannot be empty or None.")

        if not os.path.exists(path):
            raise argparse.ArgumentTypeError(f"The file '{path}' does not exist.")

        if not os.path.isfile(path):
            raise argparse.ArgumentTypeError(f"The path '{path}' is not a valid file.")

        if not os.access(path, os.R_OK):
            raise argparse.ArgumentTypeError(f"The file '{path}' is not readable.")

        return path

    class CustomArgumentParser(argparse.ArgumentParser):
        def print_help(self, *args, **kwargs):
            """
            print custom text before the default help message
            """
            print(DESCRIPTION)
            super().print_help(*args, **kwargs)

    parser = CustomArgumentParser(description="Filter panproteomes fasta at given pop_freq threshold.")
    parser.add_argument(
        "-i",
        "--input_file",
        type=is_valid_file,
        required=True,
        help="Path to the input file (panproteome fasta)",
    )
    parser.add_argument(
        "-o", "--out_file", type=str, required=True, help="Path to the output file (filtered panprotoeme fasta)"
    )
    parser.add_argument(
        "-m",
        "--minimum_freq",
        type=positive_integer,
        required=False,
        help="Minimum protein frequency",
    )
    parser.add_argument(
        "-t",
        "--top_freq",
        type=positive_integer,
        required=False,
        help="Maximum protein frequency",
    )
    args = parser.parse_args()

    try:
        with open(args.out_file, "w"):
            pass
        os.remove(args.out_file)
    except PermissionError:
        exit_with_error(f"ERROR: Cannot write to file '{args.out_file}'.", 1)

    eprint(f" |-- input_file: {args.input_file}")
    eprint(f" |-- out_file: {args.out_file}")

    if args.minimum_freq is None and args.top_freq is None:
        exit_with_error("ERROR: either --minimum_freq or --top_freq needs to be specfied", 22)

    if args.minimum_freq is None:
        args.minimum_freq = 0
    else:
        if not (0 <= args.minimum_freq <= 100):
            exit_with_error("ERROR: --minimum_freq must be between 0 and 100", 34)
        eprint(f" |-- minimum frequency: {args.minimum_freq}")

    if args.top_freq is None:
        args.top_freq = 100
    else:
        if not (0 <= args.top_freq <= 100):
            exit_with_error("ERROR: --top_freq must be between 0 and 100", 34)
        eprint(f" |-- top frequency: {args.top_freq}")

    return args


def extract_pop_freq(header_line):
    """
    Extract pop_freq from a FASTA header of the form:
    >PP|{upi} {pop_freq}% {upid} {source_id} OX={taxid} OS={proteome_name} [...]

    Returns an integer pop_freq, or None if parsing fails.
    """
    try:
        parts = header_line.strip().split()
        freq_token = parts[1] # e.g. "45%" #the first element after the first space
        return int(freq_token.rstrip("%"))
    except (IndexError, ValueError):
        return None


def filter_fasta(input_file, output_file, minimum_freq, top_freq):
    all_seqs = 0
    printed_seqs = 0
    with open(input_file, "r") as fin, open(output_file, "w") as fout:
        write_record = False
        current_header = None
        current_seq_lines = []

        for line in fin:
            if line.startswith(">"):
                all_seqs += 1
                # process previous record
                if current_header is not None and write_record:
                    printed_seqs += 1
                    fout.write(current_header)
                    fout.writelines(current_seq_lines)

                # start new record
                current_header = line
                current_seq_lines = []

                pop_freq = extract_pop_freq(line)
                write_record = (
                    pop_freq is not None and pop_freq >= minimum_freq and pop_freq <= top_freq
                )
            else:
                current_seq_lines.append(line)

        # handle last record
        if current_header is not None and write_record:
            fout.write(current_header)
            fout.writelines(current_seq_lines)

    return all_seqs, printed_seqs


if __name__ == "__main__":
    initial_secs = time.time()  # for total time count
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

    eprint(f" .-- BEGUN {timestamp} --.")
    args = check_args()

    all_seqs, printed_seqs = filter_fasta(args.input_file, args.out_file, args.minimum_freq, args.top_freq)
    eprint(f" |-- extracted {printed_seqs}/{all_seqs} sequences")

    # total time
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    eprint(f" '-- ENDED {timestamp} --'")
